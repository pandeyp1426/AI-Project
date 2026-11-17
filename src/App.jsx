import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import FavoritesProvider from './context/FavoritesProvider.jsx';
import { useFavorites } from './context/FavoritesContext.js';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Gallery from './pages/Gallery.jsx';
import PlanTrip from './pages/PlanTrip.jsx';
import WhyNYC from './pages/WhyNYC.jsx';

function StorageNotice() {
  const { warning } = useFavorites();
  return warning ? <div role="status" className="storage-warning page-shell my-4">{warning}</div> : null;
}

export default function App() {
  return <FavoritesProvider><a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a><Navbar /><StorageNotice /><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/explore" element={<Explore />} /><Route path="/gallery" element={<Gallery />} /><Route path="/plan" element={<PlanTrip />} /><Route path="/why-nyc" element={<WhyNYC />} /><Route path="*" element={<section className="page-shell py-24 text-center"><p className="eyebrow text-rust">A wrong turn, a fresh start</p><h1 className="page-title mt-5">This street isn’t on our map.</h1><p className="mt-6 text-slate">The city still has plenty to explore.</p><Link to="/" className="button button-dark mt-7">Back to New York</Link></section>} /></Routes></main><Footer /><ScrollToTop /></FavoritesProvider>;
}
