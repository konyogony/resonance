import { cn } from '@/lib/utils';
import { User } from '@/types';

interface SidebarProps {
    user: User | null;
}

const Sidebar = ({ user }: SidebarProps) => {
    // const [md, setMd] = useState(useMediaQuery('(min-width: 1024px)'));
    // const [collapsed, setCollpased] = useState(md);

    // // Not sure how well performant this is
    // useEffect(() => {
    //     const handleResize = () => {
    //         const newMd = window.innerWidth <= 1024;
    //         console.log(newMd);
    //         setMd(newMd);
    //         newMd && setCollpased(true);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <aside
            className={cn(
                'h-full border-r bg-zinc-950/15 border-white/5 flex flex-col transition-all duration-200',
                // collapsed ? 'w-[16%] md:w-[12%] lg:w-[10%] xl:w-[8%] 2xl:w-[4%]' :
                'w-1/4 xl:w-[18%] 2xl:w-[16%]',
            )}
        >
            <div className='w-full flex flex-col px-8 py-4'>
                <div
                    className={cn(
                        'grid grid-cols-[0fr_min-content]  mt-4 transition-[grid-template-rows] w-full duration-200 items-center',
                        // !collapsed && 'grid-cols-[1fr_min-content]',
                    )}
                >
                    <span className='text-xl flex font-medium overflow-hidden'>Resonance</span>
                    {/* {!md && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className='px-1 ml-auto flex !ring-0 !outline-none !border-none text-zinc-400  hover:!text-zinc-200'
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
                    )} */}
                </div>
            </div>

            {/* <div className='w-full mt-auto justify-between items-center h-fit p-4 border-none border-white/10 flex flex-row'>
                <Avatar user={user} collapsed={collapsed} />
            </div> */}
        </aside>
    );
};

export default Sidebar;
