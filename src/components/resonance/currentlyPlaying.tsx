import { Slider } from '@/components/ui/slider';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';
import {
    IoPause,
    IoPlay,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoRepeat,
    IoShuffle,
    IoVolumeHigh,
    IoVolumeLow,
    IoVolumeMedium,
    IoVolumeOff,
} from 'icons/io5';
import { useEffect, useRef, useState } from 'react';

interface CurrentlyPlayingProps {
    track: Track;
}

interface Track {
    title: string;
    author: string;
    albumImg: string;
    duration: number;
}

const CurrentlyPlaying = ({ track }: CurrentlyPlayingProps) => {
    const [prevVolume, setPrevVolume] = useState(50);
    const [volume, setVolume] = useState(prevVolume);
    const [playing, setPlaying] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [repeatSate, setRepeatState] = useState(0);
    const [second, setSecond] = useState(0);
    const [lg, setLg] = useState(window.innerWidth <= 1024);
    const [time, setTime] = useState({
        date: new Date(),
        militaryTime: true,
    });
    const playRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleResize = () => setLg(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prevSecond) => {
                if (playing) return (prevSecond + 1) % track.duration;
                return prevSecond;
            });
            setTime({ ...time, date: new Date() });
        }, 1000);

        return () => clearInterval(interval);
    }, [playing, track.duration]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    playRef.current?.focus();
                    setPlaying((prev) => !prev);

                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleVolumeToggle = () => {
        setVolume((prev) => {
            if (prev === 0) {
                return prevVolume;
            } else {
                setPrevVolume(prev);
                return 0;
            }
        });
    };

    return (
        <div className='fixed z-40 bottom-4 left-1/2 -translate-x-1/2 min-w-[90vw] backdrop-blur-2xl'>
            <div className='flex items-center relative pl-16 pr-8 py-4 bg-zinc-950/60 backdrop-blur-2xl rounded-3xl'>
                <div
                    aria-hidden='true'
                    className='fixed animate-spin will-change-transform origin-center -top-6 left-8 size-24 rounded-full bg-zinc-300 overflow-hidden'
                    style={{
                        animationDuration: '10s',
                        animationPlayState: playing ? 'running' : 'paused',
                        backgroundImage: `url(${track.albumImg})`,
                        backgroundSize: '140%',
                        backgroundPosition: 'center',
                    }}
                />
                <div className='flex flex-col ml-20 flex-shrink-0'>
                    <h2 className='text-zinc-200 font-medium text-lg'>{track.title}</h2>
                    <p className='text-zinc-400 text-sm'>{track.author}</p>
                </div>

                <div className='flex lg:justify-center flex-row gap-2 items-center w-full'>
                    <div className='flex flex-row gap-2 items-center lg:mr-6 mr-auto mx-6'>
                        <button
                            onClick={() => console.log('Previous track')}
                            className='text-zinc-400 hover:text-white transition-colors'
                        >
                            <IoPlaySkipBack size={lg ? 18 : 22} />
                        </button>
                        <button
                            onClick={() => setPlaying((prev) => !prev)}
                            ref={playRef}
                            className='text-zinc-400 hover:text-white transition-colors'
                        >
                            {playing ? <IoPause size={lg ? 24 : 28} /> : <IoPlay size={lg ? 24 : 28} />}
                        </button>
                        <button
                            onClick={() => console.log('Next track')}
                            className='text-zinc-400 hover:text-white transition-colors'
                        >
                            <IoPlaySkipForward size={lg ? 18 : 22} />
                        </button>
                    </div>
                    <span className='text-xs text-zinc-400 flex flex-row min-w-6 items-center justify-center'>
                        {Math.floor(second / 60)}:{String(Math.floor(second % 60)).padStart(2, '0')}
                    </span>
                    <Slider
                        defaultValue={[0]}
                        max={track.duration}
                        step={1}
                        className={'w-[80%] max-w-[20vw] '}
                        value={[second]}
                        onValueChange={(e) => setSecond(e[0])}
                    />
                    <span className='text-xs text-zinc-400 flex mr-6 flex-row min-w-6 items-center justify-center'>
                        {Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, '0')}
                    </span>
                </div>

                <div className='flex flex-row lg:ml-6 gap-2 flex-shrink-0 items-center'>
                    <span className='hidden lg:flex text-sm items-center justify-center text-zinc-400 w-16'>
                        {time.date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: !time.militaryTime,
                        })}
                    </span>
                    <div className='flex flex-row items-center gap-2 mx-1'>
                        <button onClick={() => setShuffle((prev) => !prev)} className='flex flex-colr relative'>
                            <IoShuffle
                                size={24}
                                className={cn(
                                    'transition-all duration-300',
                                    shuffle ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-300',
                                )}
                            />
                            {shuffle && (
                                <div className='size-1 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-zinc-50 rounded-full' />
                            )}
                        </button>
                        <button
                            onClick={() => setRepeatState((prev) => (prev === 0 ? 1 : prev === 1 ? 2 : 0))}
                            className='flex flex-col relative'
                        >
                            <IoRepeat
                                size={24}
                                className={cn(
                                    'transition-all duration-300',
                                    repeatSate !== 0 ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-300',
                                )}
                            />
                            {repeatSate === 1 ? (
                                <div className='size-1 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-zinc-50 rounded-full' />
                            ) : repeatSate === 2 ? (
                                <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 flex justify-center items-center text-[10px] text-zinc-50'>
                                    1
                                </div>
                            ) : null}
                        </button>
                    </div>
                    <button onClick={handleVolumeToggle} className='text-zinc-400 hover:text-zinc-300'>
                        {volume > 60 ? (
                            <IoVolumeHigh size={18} />
                        ) : volume > 30 ? (
                            <IoVolumeMedium size={18} />
                        ) : volume !== 0 ? (
                            <IoVolumeLow size={18} />
                        ) : (
                            <IoVolumeOff size={18} />
                        )}
                    </button>
                    <Slider
                        defaultValue={[volume]}
                        max={100}
                        step={1}
                        value={[volume]}
                        className={'w-[5vw] xl:w-[3vw]'}
                        onValueChange={(e) => setVolume(e[0])}
                    />
                    <span className='flex flex-row text-xs text-zinc-300 w-8'>{Math.floor(volume)}%</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentlyPlaying;
