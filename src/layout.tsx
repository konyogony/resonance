import CurrentlyPlaying from '@/components/resonance/currentlyPlaying';
import Navbar from '@/components/resonance/navbar';
import Sidebar from '@/components/resonance/sidebar';
import Toaster from '@/components/resonance/toaster';
import { User } from '@/types';
import { invoke } from '@tauri-apps/api/core';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
    const [user, setUser] = useState<User | null>({
        username: 'konyogony',
        avatar: 'https://avatars.githubusercontent.com/u/45127834?v=4',
        original_color: '',
        darker_color: '',
    });

    const fetchColors = useCallback(async () => {
        const result: string[] = await invoke('calculate_average_color', { imageUrl: user?.avatar });
        setUser(
            (prev) =>
                prev && {
                    ...prev,
                    original_color: result[0],
                    darker_color: result[1],
                },
        );
    }, []);

    useEffect(() => {
        fetchColors();
    }, []);

    return (
        <div className='w-full h-screen flex flex-col relative'>
            <div className='w-full h-full flex flex-row'>
                <Sidebar user={user} />
                <div className='w-full flex flex-col'>
                    <Navbar />
                    <Outlet />
                </div>
            </div>
            <CurrentlyPlaying
                track={{
                    title: 'Tejano Blue',
                    author: 'Cigarettes After Sex',
                    albumImg: 'https://f4.bcbits.com/img/a3503054271_65',
                    duration: 234,
                }}
            />
            <Toaster />
        </div>
    );
};

export default Layout;
