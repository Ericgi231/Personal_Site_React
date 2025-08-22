import { Navigate, Routes, Route } from "react-router-dom";
import Home from '@pages/Home/Home.js';
import Fileshare from '@pages/Fileshare/Fileshare.js';
import FileshareHelp from '@pages/Fileshare/FileshareHelp.js';
import MoraJai from '@pages/MoraJai/MoraJai.js';
import NotFound from '@pages/NotFound/NotFound.js';

const App = () => (
  <>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fileshare" element={<Fileshare />} />
        <Route path="/help" element={<FileshareHelp />} />
        <Route path="/god" element={<Fileshare />} />
        <Route path="/morajai" element={<MoraJai />} />
        <Route path="/collection" />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  </>
)

export default App