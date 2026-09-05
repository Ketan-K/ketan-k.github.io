import React, { useState } from 'react';
import { RequestLifecycleDemo } from './RequestLifecycleDemo';
import { RealtimeEventStreamDemo } from './RealtimeEventStreamDemo';
import { WebRtcTopologyDemo } from './WebRtcTopologyDemo';
import { CacheTierDemo } from './CacheTierDemo';
import { AiStreamingDemo } from './AiStreamingDemo';
import { ResilienceDemo } from './ResilienceDemo';
import { Terminal, Cpu, Radio, Network, Database, Sparkles, ShieldAlert } from 'lucide-react';
import './Demos.css';

export const DemosSection: React.FC = () => {
  const [activeDemoId, setActiveDemoId] = useState<string>('all');

  const demoList = [
    { id: 'all', label: 'All Demos (Full Suite)', icon: Terminal },
    { id: 'lifecycle', label: 'A: Request Lifecycle', icon: Cpu },
    { id: 'realtime', label: 'B: Realtime Event Bus', icon: Radio },
    { id: 'webrtc', label: 'C: WebRTC Topology', icon: Network },
    { id: 'caching', label: 'D: Tiered Caching', icon: Database },
    { id: 'aistream', label: 'E: AI Token Streaming', icon: Sparkles },
    { id: 'resilience', label: 'F: System Resilience', icon: ShieldAlert }
  ];

  return (
    <section className="section" id="demos">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Cpu size={14} />
            <span>02 / INTERACTIVE ENGINEERING DEMOS</span>
          </div>
          <h2 className="section-title">Full-Stack Systems in Action</h2>
          <p className="section-subtitle">
            Demonstrating end-to-end engineering thinking through 6 interactive models. Each demonstration takes 5–15 seconds to explore and simulates real-world protocol behaviors, caching layers, and failure recovery.
          </p>
        </div>

        {/* Demo Filter Bar */}
        <div className="demos-filter-bar font-mono">
          {demoList.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`demo-filter-pill ${activeDemoId === item.id ? 'demo-filter-active' : ''}`}
                onClick={() => setActiveDemoId(item.id)}
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Demos Grid / Stack */}
        <div className="demos-stack">
          {(activeDemoId === 'all' || activeDemoId === 'lifecycle') && (
            <RequestLifecycleDemo />
          )}

          {(activeDemoId === 'all' || activeDemoId === 'realtime') && (
            <RealtimeEventStreamDemo />
          )}

          {(activeDemoId === 'all' || activeDemoId === 'webrtc') && (
            <WebRtcTopologyDemo />
          )}

          {(activeDemoId === 'all' || activeDemoId === 'caching') && (
            <CacheTierDemo />
          )}

          {(activeDemoId === 'all' || activeDemoId === 'aistream') && (
            <AiStreamingDemo />
          )}

          {(activeDemoId === 'all' || activeDemoId === 'resilience') && (
            <ResilienceDemo />
          )}
        </div>
      </div>
    </section>
  );
};
