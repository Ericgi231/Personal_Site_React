import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const FileShare = lazy(() => import("@pages/FileShare"));
const MoraJai = lazy(() => import("@pages/MoraJai"));
const AnimalRaceBets = lazy(() => import("@pages/AnimalRaceBets"));
const ApiHelp = lazy(() => import("@pages/ApiHelp"));

const LazyRoute = ({ Component }: { Component: React.ComponentType }) => (
  <Suspense fallback={<div></div>}>
    <Component />
  </Suspense>
);

const App = () => (
  <>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

        <Route path="/fileshare" element={<LazyRoute Component={FileShare} />} />
        <Route path="/god" element={<LazyRoute Component={FileShare} />} />
        <Route path="/help" element={<LazyRoute Component={ApiHelp} />} />
        <Route path="/morajai" element={<LazyRoute Component={MoraJai} />} />
        <Route path="/animal-race-bets" element={<LazyRoute Component={AnimalRaceBets} />} />
      </Routes>
    </main>
  </>
)

export default App