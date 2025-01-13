import { useMediaQuery } from '@/lib/useMediaQuery';
import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
    return (
        <Sonner
            richColors
            theme='dark'
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};

export default Toaster;
