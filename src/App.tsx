import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import './App.css';

const App = () => {
    const [greetMsg, setGreetMsg] = useState('');
    const [name, setName] = useState('');

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke('greet', { name }));
    }

    return <main></main>;
};

export default App;
