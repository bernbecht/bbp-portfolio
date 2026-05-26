'use client';

import { cn } from '@/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly activeClassName?: string;
  readonly match?: 'exact' | 'prefix';
  readonly 'aria-label'?: string;
}

function isNavActive(
  pathname: string,
  href: string,
  match: 'exact' | 'prefix',
): boolean {
  if (pathname === href) {
    return true;
  }

  if (match === 'prefix') {
    return pathname.startsWith(`${href}/`);
  }

  return false;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  match = 'exact',
  'aria-label': ariaLabel,
}: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = isNavActive(pathname, href, match);

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
        isActive
          ? (activeClassName ?? 'font-bold text-neutral-900')
          : 'text-neutral-600 hover:text-neutral-900',
        className,
      )}
    >
      {children}
    </Link>
  );
}
