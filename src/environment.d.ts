import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      readonly CLERK_SECRET_KEY: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: string;
      readonly NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: string;
    }
  }
}
