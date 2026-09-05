import React from 'react';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import './Contact.css';

export const ContactSection: React.FC = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-box tech-frame">
          <div className="tech-frame-header">
            <span className="font-mono">INITIALIZE_COMMUNICATION // DIRECT CHANNELS</span>
            <div className="contact-status-tag font-mono">
              <span className="status-dot"></span>
              <span>OPEN TO REMOTE OPPORTUNITIES</span>
            </div>
          </div>

          <div className="tech-frame-body contact-body">
            <div className="contact-main">
              <h2 className="contact-headline">
                Have an interesting real-time or systems challenge?<br />
                Let's connect.
              </h2>
              <p className="contact-subtext">
                Whether you are scaling high-concurrency WebRTC communication topologies, engineering resilient distributed backends, or exploring progressive AI streaming interfaces, I am open to discussing senior engineering roles and high-impact technical initiatives.
              </p>
              <div className="contact-location font-mono">
                <MapPin size={13} className="location-icon" />
                <span>Ahmednagar / Pune, Maharashtra, India · Open to Worldwide Remote</span>
              </div>
            </div>

            <div className="contact-channels font-mono">
              <a
                href="mailto:ketankatore.9@gmail.com"
                className="contact-channel-card contact-channel-primary"
                aria-label="Send direct email to ketankatore.9@gmail.com"
              >
                <div className="channel-icon-wrap">
                  <Mail size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">EMAIL DIRECT</span>
                  <span className="channel-address">ketankatore.9@gmail.com</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://linkedin.com/in/ketan-k"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card"
                aria-label="Open Ketan Katore LinkedIn profile"
              >
                <div className="channel-icon-wrap">
                  <LinkedinIcon size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">LINKEDIN</span>
                  <span className="channel-address">linkedin.com/in/ketan-k</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://github.com/Ketan-K"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card"
                aria-label="Open Ketan Katore GitHub profile"
              >
                <div className="channel-icon-wrap">
                  <GithubIcon size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">GITHUB</span>
                  <span className="channel-address">github.com/Ketan-K</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
