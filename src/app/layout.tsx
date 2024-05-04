import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import { TRPCReactProvider } from '~/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Управление Проектами',
  description:
    'ВКР – Разработка прототипа ИС поддержки контроля выполнения задач ИТ-проектов на примере типового агентства по разработке веб-приложений',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
