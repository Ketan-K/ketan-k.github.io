import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { SelectedWork } from './components/work/SelectedWork';
import { DemosSection } from './components/demos/DemosSection';
import { SystemsSection } from './components/systems/SystemsSection';
import { WebRtcDeepDive } from './components/webrtc/WebRtcDeepDive';
import { AiLabSection } from './components/ailab/AiLabSection';
import { BackendDesignSection } from './components/backend/BackendDesignSection';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { TechStackGrid } from './components/stack/TechStackGrid';
import { EngineeringNotes } from './components/writing/EngineeringNotes';
import { SelectedRepos } from './components/github/SelectedRepos';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';

export const App: React.FC = () => {
  return (
    <div className="portfolio-app">
      <Navbar />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <DemosSection />
        <SystemsSection />
        <WebRtcDeepDive />
        <AiLabSection />
        <BackendDesignSection />
        <ExperienceTimeline />
        <TechStackGrid />
        <EngineeringNotes />
        <SelectedRepos />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
