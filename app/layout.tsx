import type { Metadata } from 'next';
import { Anuphan } from 'next/font/google';
import './globals.css';

const anuphan = Anuphan({
  variable: '--font-anuphan',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin']
});

export const metadata: Metadata = {
  title: 'SUHAIMEE KAJE | Software Developer',
  description: 'พอร์ตโฟลิโอ Full-stack Developer ที่เน้นการพัฒนาเว็บแอปพลิเคชันที่ขยายระบบได้และ cloud-native systems'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${anuphan.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
