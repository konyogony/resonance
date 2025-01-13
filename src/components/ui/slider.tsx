import { cn } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
    >
        <SliderPrimitive.Track className='relative h-1 w-full grow group transition-all overflow-hidden rounded-full bg-zinc-900/20 dark:bg-zinc-50/20'>
            <SliderPrimitive.Range className='absolute h-full bg-zinc-900 dark:bg-zinc-300  group-hover:bg-zinc-50 transition-all' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='block size-2.5 hover:size-[11px] rounded-full border border-zinc-200 border-zinc-900/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-50/50 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300' />
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
