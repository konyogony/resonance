import Search from '@/components/resonance/search';
import { Button } from '@/components/ui/button';
import { exit } from '@tauri-apps/plugin-process';
import { FiChevronLeft, FiChevronRight, FiX } from 'icons/fi';

const Navbar = () => {
    const exitApp = async () => {
        await exit(0);
    };
    return (
        <nav className='w-full py-4 px-8 flex flex-row items-center border-b border-white/10'>
            <div className='flex flex-row gap-1 text-zinc-500'>
                <button className='!ring-0 !outline-none !border-none  hover:!text-zinc-300'>
                    <FiChevronLeft size={26} />
                </button>
                <button className='!ring-0 !outline-none !border-none  hover:!text-zinc-300'>
                    <FiChevronRight size={26} />
                </button>
            </div>
            <Search className='ml-auto' />
            <div className='flex flex-row ml-auto'>
                <Button
                    size={'icon'}
                    variant={'outline'}
                    className='focus:!ring-0 focus:!outline-0 focus:!bg-zinc-800'
                    onClick={exitApp}
                >
                    <FiX size={16} />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
