import { ReactNode } from 'react';
import cn from 'classnames';
import { Navigation } from 'components/Navigation';

type Layout = React.FC<{
  currentModel?: string;
  fullWidth?: boolean;
  children: ReactNode;
}>;

export const Layout: Layout = ({
  currentModel = null,
  fullWidth = false,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <Navigation currentModel={currentModel} />
      <div
        className={cn({
          'py-10 px-6 lg:px-8 xl:px-0': true,
          'container mx-auto': !fullWidth,
        })}
      >
        {children}
      </div>
    </div>
  );
};
