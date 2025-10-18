import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const FrameworkLink = React.forwardRef((props: LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  return <Link {...props} />;
});

export { FrameworkLink };
