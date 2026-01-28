// SSR guard utilities
export const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

export const safeScrollbarSize = (): number => {
  if (!isBrowser()) return 0;
  // @ts-ignore - window.document available in browser environments
  return window.innerWidth - document.documentElement.clientWidth;
};
