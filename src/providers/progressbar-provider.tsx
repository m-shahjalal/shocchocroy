'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgressProviders = ({ children }) => (
  <>
    {children}
    <ProgressBar
      color="#111827"
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    />
  </>
);

export default NProgressProviders;
