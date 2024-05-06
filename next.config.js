/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
};

export default config;
