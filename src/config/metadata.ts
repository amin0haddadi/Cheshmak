import type { Metadata } from 'next';

import { brand } from '@/config/brand';

const rootMetadata: Metadata = {
  title: {
    template: '49892761',
    // `%s - ${brand.name}`
    default: '49892761',
    //  brand.name
  },
  description: brand.description,

  authors: [
    {
      name: 'Amin Haddadi',
    },
  ],
  keywords: [...brand.keywords],
  other: {
    enamad: '49892761',
  },
};

export { rootMetadata };
