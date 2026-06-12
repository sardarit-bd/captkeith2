import React from 'react'

export default function DashboardPageHeader() {
  return (
    <div className="border-b border-sidebar-border bg-white/50">
    <div className="px-5 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-sm text-muted-foreground">
                    Good Morning, Samiur
                </p>

                <h1 className="text-2xl font-semibold">
                    Owner Dashboard
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage vessels, captains and charter activity.
                </p>
            </div>

            <div className="text-sm text-muted-foreground">
                Monday, August 4
            </div>
        </div>
    </div>
</div>
  )
}
