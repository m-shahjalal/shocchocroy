import React from 'react';

import { cn } from '../../utils/cn';
import { BarsSpinner } from './bars-spinner';
import { PulseLoader } from './pulse-spinner';
import { Spinner } from './spinner';
import { ThreeDotScale } from './three-dot-scale';

const loaderStyles = {
  base: 'h-auto',
  sizes: {
    sm: 'w-5',
    md: 'w-[22px]',
    lg: 'w-7',
    xl: 'w-9',
  },
  colors: {
    current: 'text-current',
    primary: 'text-primary',
    secondary: 'text-secondary',
    danger: 'text-red',
    info: 'text-blue',
    success: 'text-green',
    warning: 'text-orange',
  },
};

const Components = {
  bars: BarsSpinner,
  pulse: PulseLoader,
  spinner: Spinner,
  threeDot: ThreeDotScale,
};

export type LoaderSizeTypes = keyof typeof loaderStyles.sizes;
export type LoaderColorTypes = keyof typeof loaderStyles.colors;
export interface LoaderTypes extends React.SVGProps<SVGSVGElement> {
  size?: LoaderSizeTypes;
  variant?: keyof typeof Components;
  color?: LoaderColorTypes;
  className?: string;
}

export function Loader({
  size = 'md',
  color = 'current',
  variant = 'bars',
  className,
  ...props
}: LoaderTypes) {
  const SVGComponent = Components[variant];

  return (
    <SVGComponent
      className={cn(
        loaderStyles.base,
        loaderStyles.sizes[size],
        loaderStyles.colors[color],
        className
      )}
      {...props}
    />
  );
}

Loader.displayName = 'Loader';
