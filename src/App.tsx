import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SystemsPage } from './pages/SystemsPage';
import { WebRtcPage } from './pages/WebRtcPage';
import { FullStackPage } from './pages/FullStackPage';
import { AiPage } from './pages/AiPage';
import { AiExperimentDetailPage } from './pages/AiExperimentDetailPage';
import { WritingPage } from './pages/WritingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="portfolio-app">
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<ProjectDetailPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/systems" element={<SystemsPage />} />
              <Route path="/systems/webrtc" element={<WebRtcPage />} />
              <Route path="/systems/full-stack" element={<FullStackPage />} />
              <Route path="/ai" element={<AiPage />} />
              <Route path="/ai/:id" element={<AiExperimentDetailPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/writing/:id" element={<ArticleDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
