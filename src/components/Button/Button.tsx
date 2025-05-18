import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'gradient-outline';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  ...rest
}) => {
  const cls = [
    styles.button,
    variant === 'gradient-outline' && styles['button--gradient-outline'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      {variant === 'gradient-outline' ? (
        <span className={styles.inner}>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};
