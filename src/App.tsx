import { Navigate, Routes, Route } from "react-router-dom";
import { Home, Fileshare, MoraJai, NotFound, AnimalRaceBets, ApiHelp } from '@/index';

const App = () => (
  <>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fileshare" element={<Fileshare />} />
        <Route path="/help" element={<ApiHelp />} />
        <Route path="/god" element={<Fileshare />} />
        <Route path="/morajai" element={<MoraJai />} />
        <Route path="/animal-race-bets" element={<AnimalRaceBets />} />
        <Route path="/collection" />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </main>
  </>
)

export default App