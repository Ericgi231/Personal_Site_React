import { Navigate, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Fileshare from './pages/Fileshare/Fileshare';
import FileshareHelp from './pages/Fileshare/FileshareHelp';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/fileshare" element={<Fileshare />} />
          <Route path="/help" element={<FileshareHelp />} />
          <Route path="/god" element={<Fileshare />} />
          <Route path="/collection" />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
