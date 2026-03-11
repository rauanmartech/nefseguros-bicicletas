import React from 'react';
import logoFull from '@/assets/logo.webp';
import logoCropado from '@/assets/logo-cropado.webp';

interface LogoProps {
    variant?: 'full' | 'cropado';
    className?: string;
    alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
    variant = 'full',
    className = '',
    alt = 'NEF Nexus'
}) => {
    const src = variant === 'full' ? logoFull : logoCropado;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
        />
    );
};
