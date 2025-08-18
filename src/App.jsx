import { Navigate, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Memes from './pages/Memes/Memes';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/memes" element={<Memes />} />
          <Route path="/god" element={<Memes />} />
          <Route path="/collection" />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
