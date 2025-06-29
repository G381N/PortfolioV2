import React from 'react';

// External module declarations
declare module 'react-icons/fi';
declare module 'framer-motion';
declare module 'next/font/google';

// JSX namespace for components
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Motion component props type
interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
}

// React event types
declare namespace React {
  interface ChangeEvent<T = Element> {
    target: EventTarget & T;
  }
  
  interface FormEvent<T = Element> {
    preventDefault(): void;
  }
  
  type ReactNode = React.ReactElement | string | number | boolean | null | undefined | React.ReactNodeArray;
} 