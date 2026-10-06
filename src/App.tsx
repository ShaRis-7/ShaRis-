import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cream text-brown">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:serviceSlug" element={<BookingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
