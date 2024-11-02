import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import React, {type FC} from 'react';
import IconDiscount from './IconDiscount';
import {Badge, type BadgeProps} from './badge';

interface Props {
  status: string;
  icon: 'NoSymbolIcon' | 'ClockIcon' | 'SparklesIcon' | 'IconDiscount';
  className?: string;
  color?: BadgeProps['color'];
}

const ProductStatus: FC<Props> = ({
  status,
  icon,
  color = 'zinc',
  className = 'absolute top-3 start-3 px-2.5 py-1.5 text-xs',
}) => {
  const renderIcon = () => {
    if (icon === 'NoSymbolIcon') {
      return NoSymbolIcon;
    }
    if (icon === 'ClockIcon') {
      return ClockIcon;
    }
    if (icon === 'SparklesIcon') {
      return SparklesIcon;
    }
    if (icon === 'IconDiscount') {
      return IconDiscount;
    }
    return null;
  };
  const Icon = renderIcon();

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg !rounded-full flex items-center justify-center ${className}`;
    return (
      <Badge color={color} className={CLASSES}>
        {Icon ? <Icon className="w-3.5 h-3.5" /> : ''}
        <span className="leading-none">{status}</span>
      </Badge>
    );
  };

  return renderStatus();
};

export default ProductStatus;
