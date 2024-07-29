import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={`shadow-midnight dark:shadow-midnight flex w-full items-center justify-center rounded-b-lg rounded-tl-lg bg-midnight px-9 py-4 text-base font-medium text-off-white duration-300 hover:bg-midnight/90 ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Carregando...' : children}    </button>
  );
};

export default Button;
