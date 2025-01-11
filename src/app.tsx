import Layout from '@/layout';
import { Page } from '@/pages/page';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@/css/app.css';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Page />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
