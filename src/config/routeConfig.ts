export enum AppRoutes {
  MAIN = 'main',
  PROJECTS = 'projects',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  ANALYTICS = 'analytics',
  HELP = 'help',
  SETTINGS = 'settings',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROJECTS]: '/projects',
  [AppRoutes.SIGN_IN]: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/sign-in',
  [AppRoutes.SIGN_UP]: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? '/sign-up',
  [AppRoutes.ANALYTICS]: '/analytics',
  [AppRoutes.HELP]: '/help',
  [AppRoutes.SETTINGS]: '/settings',
};

type DynamicRoutes = AppRoutes.PROJECTS;

export const DynamicRoutePath: Record<DynamicRoutes, (id: number) => string> = {
  [AppRoutes.PROJECTS]: (id: number) => `/projects/${id}`,
};
