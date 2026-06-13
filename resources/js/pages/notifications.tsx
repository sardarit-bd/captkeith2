import { Head, router } from '@inertiajs/react'
import { useEffect } from 'react'
import { Bell } from 'lucide-react'
import { notifications } from '@/routes'
import type { PageProps } from '@/types'

export default function Notifications({ auth, notifications }: PageProps & { notifications: any }) {
  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({
        only: ['notifications'],
        preserveScroll: true,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head title="Notifications" />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          <button 
            onClick={() => router.reload({ only: ['notifications'] })}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          {notifications?.data?.length > 0 ? (
            <div className="space-y-4">
              {notifications.data.map((notification: any) => (
                <div 
                  key={notification.id} 
                  className={`border-b pb-4 last:border-0 ${
                    !notification.read_at ? 'bg-blue-50/50 -mx-6 px-6' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{notification.data.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.data.message}
                      </p>
                    </div>
                    {!notification.read_at && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600 mt-2" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Notifications.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Notifications' },
  ],
  pageHeader: {
    title: 'Notifications',
    description: 'View your notifications',
  },
}