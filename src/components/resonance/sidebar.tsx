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
            const newMd = window.innerWidth <= 768;
            console.log(newMd);
            setMd(newMd);
            newMd && setCollpased(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <aside
            className={cn(
                'h-full border-r border-white/15 flex flex-col transition-all duration-200',
                collapsed && !md
                    ? 'w-[9%] md:w-[12%] lg:w-[10%] xl:w-[8%] 2xl:w-[6%] 3xl:w-[4%]'
                    : 'w-[25%] md:w-[18%] lg:w-[16%] xl:w-[14%] 2xl:w-[12%]',
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
