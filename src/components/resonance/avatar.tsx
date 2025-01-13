import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import copy from 'copy-to-clipboard';
import { FiCheck, FiUser } from 'icons/fi';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface AvatarProps {
    user: User | null;
    collapsed: boolean;
}

const Avatar = ({ user, collapsed }: AvatarProps) => {
    const [clicked, setClicked] = useState(false);

    const clickCopy = useCallback((text: string) => {
        copy(text);
        setClicked(true);
        toast.success('Code copied to clipboard');
        setTimeout(() => setClicked(false), 2000);
    }, []);

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
                className='!bg-zinc-800 !w-[16rem] flex flex-col p-0 overflow-hidden !rounded-xl'
                sideOffset={10}
            >
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${user?.original_color}, ${user?.darker_color})`,
                    }}
                    className='w-full h-[5rem]'
                />
                <div className='w-full flex flex-col relative px-4 py-8'>
                    <div className='rounded-full size-18 flex items-center absolute left-2 -top-9 justify-center flex-row bg-zinc-800'>
                        <div
                            className='rounded-full size-16 flex items-center justify-center flex-row bg-zinc-800'
                            style={{
                                backgroundImage: `url(${user?.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {!user?.avatar && <FiUser size={18} />}
                        </div>
                    </div>
                    <button
                        onClick={() => clickCopy(user?.username || '')}
                        className='w-fit text-lg flex flex-row gap-1 items-center font-semibold hover:text-zinc-300 text-zinc-100'
                    >
                        {user?.username}
                        <FiCheck
                            size={20}
                            className={cn(
                                'text-green-500 transition-all duration-500',
                                clicked ? 'opacity-100' : 'opacity-0',
                            )}
                        />
                    </button>
                    <div className='bg-zinc-700 rounded-lg p-4 mt-2 flex flex-col'></div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Avatar;
