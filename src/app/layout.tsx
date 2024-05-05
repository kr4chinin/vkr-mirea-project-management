import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import { TRPCReactProvider } from '~/trpc/react';
import { Header } from './_components/Header/Header';
import HolyLoader from 'holy-loader';

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
    <html lang="ru">
      <body className={`font-sans ${inter.variable} flex h-dvh flex-col`}>
        <HolyLoader color="#64748b" />

        <TRPCReactProvider>
          <Header />

          <main className="h-full">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
