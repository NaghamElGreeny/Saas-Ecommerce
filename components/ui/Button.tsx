// components/ui/button.tsx
'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseClasses = 'rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

        const variantClasses = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700',
            secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
            outline: 'border border-gray-300 bg-white hover:bg-gray-50'
        };

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg'
        };

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';