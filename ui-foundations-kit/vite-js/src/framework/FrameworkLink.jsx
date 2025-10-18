import * as React from 'react';
import { Link } from 'react-router-dom';
const FrameworkLink = React.forwardRef((props, ref) => {
  return <Link {...props} />;
});
export { FrameworkLink };
