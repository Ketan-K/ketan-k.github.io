import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import './Contact.css';

export const ContactSection: React.FC = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-box tech-frame">
          <div className="tech-frame-header">
            <span className="font-mono">INITIALIZE_COMMUNICATION // DIRECT CONTACT</span>
            <div className="contact-status-tag font-mono">
              <span className="status-dot"></span>
              <span>AVAILABLE FOR ROLES</span>
            </div>
          </div>

          <div className="tech-frame-body contact-body">
            <div className="contact-main">
              <h2 className="contact-headline">
                Have an interesting systems problem?<br />
                Let's talk.
              </h2>
              <p className="contact-subtext">
                Whether you're scaling a real-time communication platform, building streaming AI interfaces, or architecting resilient distributed backends, I'm open to discussing full-time senior engineering opportunities and technical collaborations.
              </p>
            </div>

            <div className="contact-channels font-mono">
              <a
                href="mailto:ketankatore7@gmail.com"
                className="contact-channel-card contact-channel-primary"
              >
                <div className="channel-icon-wrap">
                  <Mail size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">EMAIL DIRECT</span>
                  <span className="channel-address">ketankatore7@gmail.com</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://linkedin.com/in/ketankatore"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <LinkedinIcon size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">LINKEDIN</span>
                  <span className="channel-address">linkedin.com/in/ketankatore</span>
                </div>
                <ArrowUpRight size={16} className="channel-arrow" />
              </a>

              <a
                href="https://github.com/ketan-k"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <GithubIcon size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-type">GITHUB</span>
                  <span className="channel-address">github.com/ketan-k</span>
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
