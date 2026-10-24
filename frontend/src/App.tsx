import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/homepage.tsx';
import WhoIsTheImposter from './games/whoistheimposter/whoistheimposter.tsx';
import { games } from './data/games';

const imposterPath = games.find((game) => game.name === 'Who Is the Imposter?')?.path;

function App() {
    return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				{imposterPath ? <Route path={imposterPath} element={<WhoIsTheImposter />} /> : null}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
