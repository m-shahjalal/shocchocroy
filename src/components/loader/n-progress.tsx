'use client'
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgress = () => {
  return (
    <ProgressBar
      color="#111827"
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default NProgress;
