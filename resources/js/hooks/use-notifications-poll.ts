import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export function useNotificationsPoll(interval = 30000) { 
  useEffect(() => {
    const pollNotifications = () => {
      // Reload only the globally shared unread count prop
      router.reload({
        only: ['notificationsUnreadCount'],
        preserveScroll: true,
        preserveState: true,
      });
    };

    const intervalId = setInterval(pollNotifications, interval);
    
    return () => clearInterval(intervalId);
  }, [interval]);
}