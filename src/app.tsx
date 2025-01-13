import { useStoreUser } from '@/hooks/user';
import Layout from '@/layout';
import Login from '@/pages/login';
import { Page } from '@/pages/page';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@/css/app.css';

const App = () => {
    const user = useStoreUser((store) => store.user);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Page />} />
                </Route>
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
