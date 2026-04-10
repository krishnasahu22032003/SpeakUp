import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import { SignUpSchema, SignInSchema } from '../schemas/user.schema.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../lib/ENV.js';
import { check, email } from 'zod';

const SALT_ROUNDS = 12;

export async function UserSignUp(req: Request, res: Response) {
  const parsedData = SignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      errors: parsedData.error.flatten(),
    });
  }

  const { username, email, password } = parsedData.data;

  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    return res.status(400).json({
      success: false,
      message: 'Email Already exists Please use different email',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        username: newUser.username,
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
}

export async function UserSignIn(req: Request, res: Response) {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input',
    });
  }

  const { email, password } = parsedData.data;

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!ENV.JWT_SECRET) {
      throw new Error('JWT_SECRET missing');
    }

    const token = jwt.sign(
      { userId: checkUser.id, role: checkUser.role },
      ENV.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('user-token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'signedIn successfully',
      data: {
        role: checkUser.role
      }
    });
  } catch (error) {
    console.error('Internal server error', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export function UserSignOut(req: Request, res: Response) {

  try {
    res.clearCookie("user-token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    })
    return res.status(200).json({
      success: true,
      message: "User signed out"
    })
  } catch (error) {
    console.error("internal server error", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export async function getUserDetails(req: Request, res: Response) {

  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  };

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true
      }
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    };
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error("GetUserDetails Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export async function UpdateUserDetails(req: Request, res: Response) {
  if (!req.user?.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
  const UpdateUserSchema = SignUpSchema.partial()
  const parsedData = UpdateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      error: parsedData.error.flatten()
    });
  }

  const { username, email, password } = parsedData.data;

  try {
    // Check if email already used by another user
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(409).json({
          success: false,
          message: "Email already in use"
        });
      }
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        ...(hashedPassword && { password: hashedPassword })
      }
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username
      }
    });

  } catch (error) {
    console.error("Error updating user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}