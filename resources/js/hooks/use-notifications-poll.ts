import { useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

export function useNotificationsPoll(interval = 30000) { 
  const { props } = usePage();
  
  useEffect(() => {
    const pollNotifications = () => {
      router.reload({
        only: ['notifications'],
        preserveScroll: true,
        preserveState: true,
      });
    };

    const intervalId = setInterval(pollNotifications, interval);
    
    return () => clearInterval(intervalId);
  }, [interval]);
}