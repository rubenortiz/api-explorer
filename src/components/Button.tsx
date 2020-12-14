import { ReactNode } from 'react';

export const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: any;
}) => (
  <button
    className="border border-green-500 text-green-500 rounded-sm font-bold py-2 px-6 flex items-center hover:bg-green-500 hover:text-white"
    onClick={onClick}
  >
    {children}
  </button>
);
