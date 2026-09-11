'use client';

import { PENDING_SCROLL_TO_TOP_KEY } from '@/lib/navigation-scroll';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.sessionStorage.getItem(PENDING_SCROLL_TO_TOP_KEY) !== 'true') {
      return;
    }

    window.sessionStorage.removeItem(PENDING_SCROLL_TO_TOP_KEY);

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname]);

  return null;
}
