import { cn } from '@/lib/utils';
import { FiSearch, FiX } from 'icons/fi';
import { useEffect, useMemo, useRef, useState } from 'react';

interface SearchProps {
    className?: string;
}

const placeholders = [
    `What's on your mind?`,
    `Search for a song...`,
    `Find your favorite artist...`,
    `Look up an album...`,
    `Discover new music...`,
    `What's your jam today?`,
    `Search playlists...`,
    `Find a genre...`,
    `Look for a podcast...`,
    `What's trending now?`,
    `Search by lyrics...`,
    `Find a music video...`,
    `Explore new releases...`,
    `Search by mood...`,
    `Find a concert...`,
    `Look up a radio station...`,
    `Search by year...`,
    `Find a remix...`,
    `What's your vibe?`,
    `Search for collaborations...`,
];

const Search = ({ className }: SearchProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const placeholder = useMemo(() => placeholders[Math.floor(Math.random() * placeholders.length)], []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'k':
                    if (
                        (!e.metaKey && !e.ctrlKey) ||
                        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                        e.target instanceof HTMLInputElement ||
                        e.target instanceof HTMLTextAreaElement ||
                        e.target instanceof HTMLSelectElement
                    ) {
                        return;
                    }

                    e.preventDefault();
                    inputRef.current?.focus();

                    break;
                case 'Enter':
                    inputRef.current?.blur();
                    break;
                case 'Escape':
                    if (searchInput) {
                        setSearchInput('');
                        e.preventDefault();
                    } else {
                        inputRef.current?.blur();
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchInput]);

    return (
        <div
            className={cn(
                'flex w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/5 flex-row gap-2 items-center rounded-lg border transition-all  px-4 py-2',
                isFocused ? 'border-white/15 bg-zinc-700/50' : 'border-white/5 bg-zinc-800',
                className,
            )}
        >
            <FiSearch size={18} className='flex-shrink-0 text-gray-400' />
            <input
                ref={inputRef}
                className='text-sm w-full truncate !border-0 !ring-0 !outline-none focus:text-zinc-300 transition-all duration-150 bg-transparent pr-2 placeholder:text-zinc-400 placeholder:text-sm '
                type='text'
                placeholder={placeholder}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchInput}
            />
            {searchInput ? (
                <button onClick={() => setSearchInput('')} className='flex-shrink-0'>
                    <FiX size={14} />
                </button>
            ) : (
                <span className='flex bg-zinc-900/60 px-1 py-0.5 rounded-sm flex-row gap-1 flex-shrink-0 items-center text-xs'>
                    ⌘ K
                </span>
            )}
        </div>
    );
};

export default Search;
