import { ReactNode } from 'react';
import cn from 'classnames';

export const Button = ({
  children,
  onClick,
  active = false,
}: {
  children: ReactNode;
  onClick: any;
  active?: boolean;
}) => (
  <button
    className={cn({
      'border border-green-500 rounded-sm font-bold py-2 px-6 flex items-center focus:outline-none': true,
      'text-green-500 hover:bg-green-500 hover:text-white': !active,
      'bg-green-500 text-white': active,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
