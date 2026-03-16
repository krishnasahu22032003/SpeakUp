import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import { SignUpSchema, SignInSchema } from '../schemas/user.schema.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../lib/ENV.js';

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
      message: 'Invalid Credentials',
      error: parsedData.error.flatten(),
    });
  }

  const { email, password } = parsedData.data;

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: 'User does not exists please SingUp',
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    const token = jwt.sign(
      { userId: checkUser.id, role: checkUser.role },
      ENV.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    res.cookie('auth-token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'signedIn successfully',
    });
  } catch (error) {
    console.error('Internal server error', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
