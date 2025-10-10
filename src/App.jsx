import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Videos from './pages/Videos';
import Podcast from './pages/Podcast';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';
import Teachings from './pages/Teachings';
import TeachingDetail from './pages/TeachingDetail';
import VerseSearch from './pages/VerseSearch';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/teachings" element={<Teachings />} />
            <Route path="/teachings/:slug" element={<TeachingDetail />} />
            <Route path="/verse-search" element={<VerseSearch />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
