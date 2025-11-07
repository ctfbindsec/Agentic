import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }) => {
  const baseClasses = 'font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-6 text-lg',
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary disabled:bg-opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-secondary text-text-secondary hover:bg-secondary-hover hover:text-text focus:ring-primary border border-border disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;