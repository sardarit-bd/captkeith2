import { MyYachtsList } from './my-yachts-list';
import { MyYachtsToolbar } from './my-yachts-toolbar';

export function MyYachtsPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <MyYachtsToolbar />
                <MyYachtsList />
            </div>
        </div>
    );
}
