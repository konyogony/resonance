import Avatar from '@/components/resonance/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { FiChevronRight } from 'icons/fi';
import { useEffect, useState } from 'react';

interface SidebarProps {
    user: User | null;
}

const Sidebar = ({ user }: SidebarProps) => {
    const [md, setMd] = useState(useMediaQuery('(min-width: 768px)'));
    const [collapsed, setCollpased] = useState(md);

    // Not sure how well performant this is
    useEffect(() => {
        const handleResize = () => {
            setMd(!window.matchMedia('(min-width: 768px)').matches);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <aside
            className={cn(
                'h-full border-r border-white/15 flex flex-col transition-all duration-200',
                collapsed ? 'w-[16%] lg:w-[8%] xl:w-[4%]' : 'w-[25%] lg:w-[20%] xl:w-[15%]',
            )}
        >
            {!md && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className='w-fit ml-auto flex !ring-0 !outline-none !border-none text-zinc-400  hover:!text-zinc-200'
                                onClick={() => setCollpased((prev) => !prev)}
                            >
                                <FiChevronRight
                                    className='transition-all duration-300'
                                    style={{
                                        transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                    size={22}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side='right' align='center' className='!text-zinc-200 !bg-zinc-800'>
                            {collapsed ? 'Expand' : 'Collapse'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            <div className='w-full flex flex-col px-8 py-4'></div>

            <div className='w-full mt-auto justify-between items-center h-fit p-4 border-none border-white/10 flex flex-row'>
                <Avatar user={user} collapsed={collapsed} />
            </div>
        </aside>
    );
};

export default Sidebar;
