import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage.tsx';
import WhoIsTheImposter from './games/whoistheimposter/whoistheimposter.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/whoistheimposter" element={<WhoIsTheImposter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
