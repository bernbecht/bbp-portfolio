'use client';

import Link from 'next/link';
import { PENDING_SCROLL_TO_TOP_KEY } from '@/lib/navigation-scroll';
import type { ComponentProps } from 'react';

type ScrollToTopLinkProps = Omit<
  ComponentProps<typeof Link>,
  'onNavigate' | 'scroll'
>;

export function ScrollToTopLink({
  children,
  ...props
}: Readonly<ScrollToTopLinkProps>) {
  return (
    <Link
      {...props}
      scroll
      onNavigate={() => {
        window.sessionStorage.setItem(PENDING_SCROLL_TO_TOP_KEY, 'true');
      }}
    >
      {children}
    </Link>
  );
}
