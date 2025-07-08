'use client';

import { useEffect } from 'react';

import { WebsiteData } from '@/utils/webSettingsTypes';
import { useWebsiteStore } from '@/stores/useWebsiteStore';

type Props = {
  data: WebsiteData;
};

export default function SettingsHydration({ data }: Props) {
  const currentData = useWebsiteStore((state) => state.data);
  const setData = useWebsiteStore((state) => state.fetchSettings);

  useEffect(() => {
    // فقط لو البيانات مش موجودة (أول مرة)
    if (!currentData) {
      useWebsiteStore.setState({ data });
    }
  }, [data, currentData]);

  return null;
}
