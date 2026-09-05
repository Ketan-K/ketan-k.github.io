import React, { useState } from 'react';
import { engineeringNotes } from '../../content/writing';
import { BookOpen, Calendar, Clock, ArrowUpRight, X } from 'lucide-react';
import './Writing.css';

export const EngineeringNotes: React.FC = () => {
  const [readingNoteId, setReadingNoteId] = useState<string | null>(null);

  const activeNote = engineeringNotes.find((n) => n.id === readingNoteId);

  return (
    <section className="section" id="writing">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <BookOpen size={14} />
            <span>09 / ENGINEERING NOTES</span>
          </div>
          <h2 className="section-title">Technical Deep Dives & Systems Field Notes</h2>
          <p className="section-subtitle">
            Reflections and engineering breakdowns from building, debugging, and operating real-time protocols and distributed backends.
          </p>
        </div>

        <div className="notes-list">
          {engineeringNotes.map((note) => (
            <article key={note.id} className="note-card" onClick={() => setReadingNoteId(note.id)}>
              <div className="note-meta-row font-mono">
                <span className="note-date">
                  <Calendar size={12} />
                  <span>{note.date}</span>
                </span>
                <span className="note-dot">·</span>
                <span className="note-readtime">
                  <Clock size={12} />
                  <span>{note.readTime}</span>
                </span>
              </div>

              <h3 className="note-title">{note.title}</h3>
              <p className="note-summary">{note.summary}</p>

              <div className="note-bottom-row">
                <div className="note-tags">
                  {note.tags.map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="note-read-link font-mono">
                  <span>Read Breakdown</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Note Reader Modal */}
        {activeNote && (
          <div className="note-modal-overlay" onClick={() => setReadingNoteId(null)}>
            <div className="note-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="note-modal-header font-mono">
                <span>ENGINEERING_NOTE // {activeNote.slug}</span>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setReadingNoteId(null)}
                  aria-label="Close Note Modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="note-modal-body">
                <div className="modal-meta font-mono">
                  <span>{activeNote.date}</span>
                  <span>·</span>
                  <span>{activeNote.readTime}</span>
                </div>

                <h2 className="modal-title">{activeNote.title}</h2>

                <div className="modal-text">
                  <p className="modal-lead">{activeNote.summary}</p>

                  <div className="modal-section">
                    <h4 className="font-mono">1. Root Cause & Theoretical Background</h4>
                    <p>
                      In distributed networked applications, relying on default timeouts inevitably causes latency amplification under packet loss. When symmetric NATs or silent TCP drops occur, connection states get desynchronized between client and server unless heartbeat probing is configured with strict jitter tolerance.
                    </p>
                  </div>

                  <div className="modal-section">
                    <h4 className="font-mono">2. Architectural Solution</h4>
                    <p>
                      Deploying zero-allocation streaming frame parsers combined with exponential backoff and jitter prevents thundering herds while keeping memory overhead negligible.
                    </p>
                  </div>

                  <div className="modal-section">
                    <h4 className="font-mono">3. Production Metrics & Takeaway</h4>
                    <p>
                      Always verify socket liveness via application-level ping/pong heartbeats rather than relying exclusively on OS-level TCP Keepalive timers.
                    </p>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setReadingNoteId(null)}
                  >
                    Close Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
