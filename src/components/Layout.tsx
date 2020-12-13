import { ReactNode } from 'react';
import cn from 'classnames';

type Layout = React.FC<{
  fullWidth?: boolean;
  children: ReactNode;
}>;

export const Layout: Layout = ({ fullWidth = false, children }) => {
  return (
    <div
      className={cn({
        'px-6 lg:px-8 xl:px-0': true,
        'container mx-auto': !fullWidth,
      })}
    >
      {children}
    </div>
  );
};
