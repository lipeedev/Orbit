import '@/app/globals.css'
import { Navbar } from '@/app/components/Navbar'
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = cookies().get('orbit.token')?.value;

  const isLogged = await jwtVerify(token ?? '', secret).catch(() => false);

  return (
    <html lang="en">
      <body>
        {!!isLogged && <Navbar />}
        {children}
      </body>
    </html>
  )
}