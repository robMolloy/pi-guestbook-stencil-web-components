import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'my-first-stencil-comp',
  globalStyle: 'src/styles/daisyUi.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
