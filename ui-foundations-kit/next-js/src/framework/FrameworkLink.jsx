'use client';
import Link from 'next/link';
import * as React from 'react';
const FrameworkLink = React.forwardRef((props, ref) => {
  return (
    <Link {...props} ref={ref} href={props?.to || props?.href || ''}>
      {props?.children}
    </Link>
  );
});
export { FrameworkLink };
