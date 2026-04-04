import { type ReactNode } from 'react'
import Footer from '../landing/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex flex-col min-h-screen bg-[var(--bg-main)]'>
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
