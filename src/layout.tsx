import Navbar from '@/components/resonance/navbar';
import Sidebar from '@/components/resonance/sidebar';
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
        <div className='w-full h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-row h-full w-full'>
                <Sidebar user={user} />
                <div className='p-4 w-full '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
