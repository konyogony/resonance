import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { FiUser } from 'icons/fi';

interface AvatarProps {
    user: User | null;
    collapsed: boolean;
}

const Avatar = ({ user, collapsed }: AvatarProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        'rounded-lg px-4 py-3 hover:bg-zinc-800 items-center grid grid-cols-[min-content_0fr] transition-[grid-template-rows] duration-75 !ring-0 !outline-none !border-none focus:bg-zinc-800/50',
                        !collapsed && 'hover:bg-zinc-800 grid-cols-[min-content_1fr]',
                    )}
                >
                    <div
                        className='rounded-full size-10 flex items-center justify-center flex-row bg-zinc-700'
                        style={{
                            backgroundImage: `url(${user?.avatar})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {!user?.avatar && <FiUser size={18} />}
                    </div>
                    <div className={cn('flex flex-col overflow-hidden', !collapsed && 'ml-4 mr-2')}>
                        <span className='text-sm font-medium'>{user?.username}</span>
                        {/* <span className='text-xs text-zinc-400'>Online</span> */}
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent
                side='top'
                align='start'
                className='!bg-zinc-800 !w-[14vw] !lg:w-[6vw] !2xl:w-[2vw] flex flex-col p-0 overflow-hidden'
                sideOffset={10}
            >
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${user?.original_color}, ${user?.darker_color})`,
                    }}
                    className=' w-full h-[5rem]'
                />
            </PopoverContent>
        </Popover>
    );
};

export default Avatar;
