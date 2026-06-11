import AppLayout from '@/layouts/app-layout'
import { type PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'
import { useEffect } from 'react'

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
    <AppLayout
      title="Notifications"
      description="View your notifications"
    >
      <Head title="Notifications" />
      
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
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
                <div key={notification.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{notification.data.title}</h3>
                  <p className="text-sm text-muted-foreground">{notification.data.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No notifications yet.</p>
          )}
        </div>
      </div>
    </AppLayout>
  )
}