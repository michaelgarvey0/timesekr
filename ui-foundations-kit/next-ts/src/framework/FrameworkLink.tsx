'use client'
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

type FrameworkLinkProps = Partial<LinkProps> & {
  to?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const FrameworkLink = React.forwardRef(
  (props: FrameworkLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    return (
      <Link {...props} ref={ref} href={props?.to || props?.href || ''}>
        {props?.children}
      </Link>
    );
  },
);

export { FrameworkLink };
