'use client';

import { useEffect } from 'react';
import { WebsiteData } from '@/utils/webSettingsTypes';
import { useWebsiteStore } from '@/stores/useWebsiteStore';
import { updateCSSVariables } from '@/utils/settings';

type Props = {
  data: WebsiteData;
};

export default function SettingsHydration({ data }: Props) {
  const currentData = useWebsiteStore((state) => state.data);

  useEffect(() => {
    if (!currentData) {
      useWebsiteStore.setState({ data });
      updateCSSVariables(data.website_colors); 
    }
  }, [data, currentData]);

  return null;
}
