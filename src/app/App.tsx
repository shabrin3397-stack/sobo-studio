import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { ContentProvider } from './contexts/ContentContext';
import { EditModeProvider } from './contexts/EditModeContext';
import { EditModeToolbar } from './components/ui/EditModeToolbar';
import { PreviewModeBanner } from './components/ui/PreviewModeBanner';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/sobo/Navbar';
import { Hero } from './components/sobo/Hero';
import { Intro } from './components/sobo/Intro';
import { Philosophy } from './components/sobo/Philosophy';
import { Services } from './components/sobo/Services';
import { Work } from './components/sobo/Work';
import { Contact } from './components/sobo/Contact';
import { IdentityProject } from './components/sobo/IdentityProject';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminSignup } from './components/admin/AdminSignup';
import { AdminDashboard } from './components/admin/AdminDashboard';

const Home = () => {
  return (
    <>
      <EditModeToolbar />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Philosophy />
        <Services />
        <Work />
        <Contact />
      </main>
    </>
  );
};

function App() {
  const [showPreviewBanner, setShowPreviewBanner] = useState(false);

  useEffect(() => {
    // Force smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check if we're in preview mode (backend not available)
    // We'll show banner if localStorage has never had any content saved
    const hasBeenDeployed = localStorage.getItem('sobo_deployed');
    if (!hasBeenDeployed) {
      setShowPreviewBanner(true);
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <EditModeProvider>
          <ContentProvider>
            {showPreviewBanner && <PreviewModeBanner />}
            <Toaster theme="dark" position="top-right" />
            <div className={`font-['Inter'] bg-white text-black min-h-screen selection:bg-black selection:text-white ${showPreviewBanner ? 'pt-14' : ''}`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/identity" element={<IdentityProject />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </div>
          </ContentProvider>
        </EditModeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;