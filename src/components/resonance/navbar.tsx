import Search from '@/components/resonance/search';
import { Button } from '@/components/ui/button';
import { exit } from '@tauri-apps/plugin-process';
import { IoChevronBack, IoChevronForward, IoClose } from 'icons/io5';

const Navbar = () => {
    const exitApp = async () => {
        await exit(0);
    };
    return (
        <nav className='w-full py-6 px-8 flex flex-row items-center '>
            <div className='flex flex-row gap-1 text-zinc-500'>
                <button className='hover:text-zinc-200'>
                    <IoChevronBack size={22} />
                </button>
                <button className='hover:text-zinc-200'>
                    <IoChevronForward size={22} />
                </button>
            </div>
            <Search className='ml-6' />
            <div className='flex flex-row ml-auto'>
                <Button
                    size={'icon'}
                    variant={'outline'}
                    className='focus:!ring-0 focus:!outline-0 focus:!bg-zinc-800'
                    onClick={exitApp}
                >
                    <IoClose size={20} />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
