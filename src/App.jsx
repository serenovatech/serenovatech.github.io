import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import './styles/base.css';
import './styles/animations.css';
import './styles/components.css';

import { AuthProvider } from './admin/context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { IS_STATIC_SITE, USE_HASH_ROUTER } from './config/site';

import Header from './components/Header';
import Hero from './components/Hero';
import TrustCapabilities from './components/TrustCapabilities';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import SolutionsSection from './components/SolutionsSection';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectDetail from './components/ProjectDetail';
import HowWeWork from './components/HowWeWork';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import ConfirmationPage from './components/ConfirmationPage';
import Footer from './components/Footer';
import PortfolioSection from './components/PortfolioSection';
import PageCTA from './components/PageCTA';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import ConsultationModal from './components/ConsultationModal';
import PolicyModal from './components/PolicyModal';
import Toast from './components/Toast';

import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute';
import LoginPage from './admin/pages/LoginPage';
import DashboardOverview from './admin/pages/DashboardOverview';
import LeadsManager from './admin/pages/LeadsManager';
import ContentManager from './admin/pages/ContentManager';
import ServicesManager from './admin/pages/ServicesManager';
import ProjectsManager from './admin/pages/ProjectsManager';
import FAQManager from './admin/pages/FAQManager';
import MediaLibrary from './admin/pages/MediaLibrary';
import SettingsManager from './admin/pages/SettingsManager';
import ChangePassword from './admin/pages/ChangePassword';

// Hash routing serves every page from one URL, and BrowserRouter doesn't reset
// scroll either, so jump to the top whenever the route changes. 'instant' overrides
// the global `scroll-behavior: smooth`; an animated scroll can be cut short while
// the old page is swapped for the new one, leaving the visitor mid-page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function HomePage({ onOpenConsultation, showToast }) {
  return (
    <>
      <Hero onOpenConsultation={onOpenConsultation} />
      <TrustCapabilities />
      <Services onOpenConsultation={onOpenConsultation} />
      <SolutionsSection onOpenConsultation={onOpenConsultation} />
      {/* The static site has no CMS, so show the curated portfolio instead of CMS case studies. */}
      {IS_STATIC_SITE ? <PortfolioSection /> : <FeaturedProjects onOpenConsultation={onOpenConsultation} />}
      <HowWeWork />
      <AboutUs onOpenConsultation={onOpenConsultation} />
      <FAQ />
      {IS_STATIC_SITE ? (
        <PageCTA
          title="Have a Technology Challenge?"
          text="Whether you need a website, reliable server hosting, infrastructure support, or help planning your next technology project, let's discuss a practical solution."
        />
      ) : (
        <ContactSection showToast={showToast} />
      )}
    </>
  );
}

function PublicWebsite() {
  const navigate = useNavigate();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('');
  const [activePolicy, setActivePolicy] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenConsultation = (serviceName = '') => {
    const service = typeof serviceName === 'string' ? serviceName : '';
    if (IS_STATIC_SITE) {
      // No API for the consultation modal: send visitors to the Contact page form instead.
      navigate('/contact', { state: { service } });
      return;
    }
    setConsultationService(service);
    setConsultationOpen(true);
  };

  const skipToContent = (event) => {
    // A plain "#main-content" link would be read as a route by the hash router.
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link" onClick={skipToContent}>Skip to main content</a>
      <ScrollToTop />
      <Header />

      <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage onOpenConsultation={handleOpenConsultation} showToast={showToast} />} />
        <Route path="/services" element={<div style={{ paddingTop: '80px' }}><Services onOpenConsultation={handleOpenConsultation} /></div>} />
        <Route path="/services/:slug" element={<ServiceDetail onOpenConsultation={handleOpenConsultation} />} />
        <Route path="/solutions" element={<div style={{ paddingTop: '80px' }}><SolutionsSection onOpenConsultation={handleOpenConsultation} /></div>} />
        {IS_STATIC_SITE ? (
          <>
            <Route path="/projects" element={<PortfolioSection headingLevel={1} />} />
            <Route path="/projects/:slug" element={<Navigate to="/projects" replace />} />
          </>
        ) : (
          <>
            <Route path="/projects" element={<div style={{ paddingTop: '80px' }}><FeaturedProjects onOpenConsultation={handleOpenConsultation} /></div>} />
            <Route path="/projects/:slug" element={<ProjectDetail onOpenConsultation={handleOpenConsultation} />} />
          </>
        )}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-we-work" element={<div style={{ paddingTop: '80px' }}><HowWeWork /></div>} />
        <Route path="/faq" element={<div style={{ paddingTop: '80px' }}><FAQ /></div>} />
        <Route path="/contact" element={<ContactPage />} />
        {!IS_STATIC_SITE && <Route path="/confirmation/:refNumber" element={<ConfirmationPage />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>

      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      {/* Global Modals */}
      {!IS_STATIC_SITE && (
        <ConsultationModal
          isOpen={consultationOpen}
          onClose={() => setConsultationOpen(false)}
          showToast={showToast}
          initialService={consultationService}
        />
      )}

      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

const Router = USE_HASH_ROUTER ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <Router>
          <Routes>
            {/* The admin CMS needs the Express API, so it is left out of the static site. */}
            {!IS_STATIC_SITE && (
            <>
            {/* Admin Login */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected Admin CMS Dashboard */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route index element={<DashboardOverview />} />
              <Route path="leads" element={<LeadsManager />} />
              <Route path="messages" element={<LeadsManager />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="faqs" element={<FAQManager />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<SettingsManager />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
            </>
            )}

            {/* Public Website */}
            <Route path="/*" element={<PublicWebsite />} />
          </Routes>
        </Router>
      </SiteProvider>
    </AuthProvider>
  );
}
