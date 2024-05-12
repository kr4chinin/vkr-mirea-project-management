import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import { TRPCReactProvider } from '~/trpc/react';
import { Header } from './_components/header';
import HolyLoader from 'holy-loader';
import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '@clerk/localizations';
import { Toaster } from '~/components/ui/sonner';

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
    <ClerkProvider localization={ruRU}>
      <html lang="ru">
        <body className={`font-sans ${inter.variable} flex h-dvh flex-col`}>
          <HolyLoader color="#64748b" />

          <TRPCReactProvider>
            <Header />

            <main className="h-full">{children}</main>
          </TRPCReactProvider>

          <Toaster position="bottom-right" closeButton theme="light" duration={3000} />
        </body>
      </html>
    </ClerkProvider>
  );
}
