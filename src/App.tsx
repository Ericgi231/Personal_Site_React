import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const FileShare = lazy(() => import("@pages/FileShare"));
const MoraJai = lazy(() => import("@pages/MoraJai"));
const AnimalRaceBets = lazy(() => import("@pages/AnimalRaceBets"));
const ApiHelp = lazy(() => import("@pages/ApiHelp"));

ReactGA.initialize("G-VTTP7LRNBH");

const LazyRoute = ({ Component }: { Component: React.ComponentType }) => (
  <Suspense fallback={<div></div>}>
    <Component />
  </Suspense>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  
  return (
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
}

export default App