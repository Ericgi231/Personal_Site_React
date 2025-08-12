import { Navigate, Routes, Route } from "react-router-dom";
import Home from '/src/pages/Home/Home';
import Memes from '/src/pages/Memes/Memes';
import NotFound from '/src/pages/NotFound/NotFound';
// import Header from '/src/components/Header/Header';
// import Footer from '/src/components/Footer/Footer';

function App() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Memes" element={<Memes />} />
          <Route path="/collection" />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App
