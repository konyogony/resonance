import { Typewriter } from 'react-simple-typewriter';

const Login = () => {
    const slogans = [
        'Stream music seamlessly, anytime, anywhere.',
        'Discover more, listen longer.',
        'Your music, always in sync.',
        'A world of sound at your fingertips.',
        'Perfect playlists for every mood.',
        'Transform the way you experience music.',
        'Endless music, endless possibilities.',
        'Elevate your sound experience.',
        'Music that adapts to you.',
        'Unmatched quality, infinite tunes.',
        'Designed for the bold, built for performance.',
        'Where sleek design meets power.',
        'A stylish experience, built for music lovers.',
        'Elegance in every note.',
        'Smooth, sleek, and stylish — just like your playlist.',
        'Lightning-fast performance, always.',
        'Built for speed, crafted for experience.',
        'Music without limits. Performance without compromise.',
        'Stream effortlessly, perform flawlessly.',
        'Experience music like never before—fluid and fast.',
        'Rust. Its memory safe. Guys, memory safety',
    ];
    return (
        <div className='w-full h-screen flex flex-row font-[Inter]'>
            <div className='w-1/2 flex h-full flex-col items-center justify-center bg-pattern'>
                <div className='flex flex-col min-w-[20%]'>
                    <span className='text-3xl font-bold text-zinc-200'>Resonance</span>
                    <span className='text-lg font-normal text-zinc-200/80'>
                        <Typewriter
                            words={slogans}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1200}
                        />
                    </span>
                </div>
            </div>
            <div className='w-1/2 items-center flex h-full bg-zinc-950/60 flex-col px-16 py-32'>
                <span className='text-4xl'></span>
            </div>
        </div>
    );
};

export default Login;
