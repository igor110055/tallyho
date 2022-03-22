import { Routes, Route } from 'react-router-dom';
import { Layout, LazyLoad } from './components';
import { HomePage } from './pages';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route
                    index
                    element={
                        <LazyLoad loadingMessage='Loading Home...'>
                            <HomePage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='liquidity'
                    element={
                        <div className='grid h-full place-items-center'>
                            <h1>Liquidity</h1>
                        </div>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
