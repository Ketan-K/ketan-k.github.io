import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import './Demos.css';

interface PromptPreset {
  id: string;
  label: string;
  prompt: string;
  simulatedTtftMs: number;
  responseTokens: string[];
}

const presets: PromptPreset[] = [
  {
    id: 'ice-webrtc',
    label: 'Explain ICE in WebRTC',
    prompt: 'How does ICE candidate gathering establish a peer-to-peer connection behind symmetric firewalls?',
    simulatedTtftMs: 184,
    responseTokens: [
      'Interactive ', 'Connectivity ', 'Establishment ', '(ICE) ', 'is ', 'a ', 'standardized ', 'framework ',
      '(RFC 8445) ', 'designed ', 'to ', 'discover ', 'the ', 'most ', 'direct ', 'and ', 'efficient ', 'network ',
      'path ', 'between ', 'two ', 'peers.\n\n',
      'During ', 'candidate ', 'gathering, ', 'the ', 'engine ', 'collects:\n',
      '1. Host Candidates: ', 'Local IP/port pairs.\n',
      '2. Server Reflexive: ', 'Public endpoints discovered via STUN.\n',
      '3. Relay Candidates: ', 'Relayed paths via TURN servers for symmetric NATs.\n\n',
      'By transmitting candidate pairs via Trickle ICE, ', 'peers initiate STUN binding checks in parallel, ',
      'eliminating multi-second connection setup stalls.'
    ]
  },
  {
    id: 'ws-vs-sse',
    label: 'SSE vs WebSockets for LLMs',
    prompt: 'Why is Server-Sent Events (SSE) preferred over WebSockets for unidirectional AI token streaming?',
    simulatedTtftMs: 142,
    responseTokens: [
      'For ', 'unidirectional ', 'LLM ', 'completion ', 'streams, ', 'Server-Sent ', 'Events ', '(SSE) ',
      'offers ', 'significant ', 'architectural ', 'advantages:\n\n',
      '• Native HTTP/2 Multiplexing: ', 'Shares the same TCP connection with other HTTP requests.\n',
      '• Built-in Browser Reconnect: ', 'Browsers automatically re-establish lost connections with Last-Event-ID.\n',
      '• Corporate Proxy Traversal: ', 'Passes cleanly through enterprise firewalls and CDNs without WS upgrades.\n',
      '• Zero Binary Framing Overhead: ', 'Lightweight text/event-stream UTF-8 encoding.'
    ]
  },
  {
    id: 'cache-stampede',
    label: 'Cache Stampede Mitigation',
    prompt: 'How does Singleflight request coalescing prevent database exhaustion during cache invalidation?',
    simulatedTtftMs: 165,
    responseTokens: [
      'When ', 'a ', 'hot ', 'cache ', 'key ', 'expires, ', 'hundreds ', 'of ', 'concurrent ', 'requests ',
      'attempt ', 'to ', 'query ', 'the ', 'database ', 'simultaneously (cache dog-piling).\n\n',
      'Singleflight ', 'coalescing ', 'intercepts ', 'these ', 'in-flight ', 'lookups:\n',
      '1. The first request initializes a shared promise.\n',
      '2. Concurrent identical keys hook into the active promise.\n',
      '3. Only 1 query hits PostgreSQL; results are fanned out to all 500 callers once resolved.\n\n',
      'Combined with probabilistic early refresh (XFetch), latency spikes are completely eliminated.'
    ]
  }
];

export const AiStreamingDemo: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamStatus, setStreamStatus] = useState<'IDLE' | 'CONNECTING' | 'STREAMING' | 'COMPLETED'>('IDLE');
  const [streamedText, setStreamedText] = useState<string>('');
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [measuredTtft, setMeasuredTtft] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activePreset = presets[activePresetIndex];

  const startStream = () => {
    if (isStreaming) return;

    // Reset state
    setStreamedText('');
    setTokenCount(0);
    setMeasuredTtft(null);
    setIsStreaming(true);
    setStreamStatus('CONNECTING');

    const startTime = performance.now();

    // Simulate TTFT Delay
    setTimeout(() => {
      const ttft = Math.round(performance.now() - startTime + activePreset.simulatedTtftMs * 0.4);
      setMeasuredTtft(ttft);
      setStreamStatus('STREAMING');

      let currentTokenIdx = 0;
      const tokens = activePreset.responseTokens;

      timerRef.current = setInterval(() => {
        if (currentTokenIdx >= tokens.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsStreaming(false);
          setStreamStatus('COMPLETED');
          return;
        }

        const nextChunk = tokens[currentTokenIdx];
        setStreamedText((prev) => prev + nextChunk);
        setTokenCount((prev) => prev + 1);
        currentTokenIdx += 1;
      }, 42); // Realistic ~24 tokens/sec emission
    }, 180);
  };

  const resetStream = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsStreaming(false);
    setStreamStatus('IDLE');
    setStreamedText('');
    setTokenCount(0);
    setMeasuredTtft(null);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="demo-card">
      <div className="demo-header">
        <div className="demo-title-group">
          <span className="demo-code font-mono">DEMO E</span>
          <h4 className="demo-title">AI Token Streaming & TTFT Telemetry Profiler</h4>
        </div>
        <span className="badge badge-simulated">SIMULATED STREAM ENGINE</span>
      </div>

      <p className="demo-explainer">
        Simulate an end-to-end streaming LLM inference pipeline. Profiles Time-to-First-Token (TTFT) and progressive token delivery over chunked SSE.
      </p>

      {/* Preset Prompt Selector */}
      <div className="stream-preset-bar font-mono">
        <span className="preset-label">PROMPT PRESET:</span>
        {presets.map((preset, idx) => (
          <button
            key={preset.id}
            type="button"
            className={`preset-btn ${idx === activePresetIndex ? 'preset-btn-active' : ''}`}
            onClick={() => {
              resetStream();
              setActivePresetIndex(idx);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Pipeline Diagram */}
      <div className="ai-pipeline-track font-mono">
        <div className="track-node">Browser Client</div>
        <div className="track-sep">── SSE ──►</div>
        <div className="track-node">Streaming Gateway</div>
        <div className="track-sep">── Chunked ──►</div>
        <div className="track-node track-node-active">LLM Provider</div>
      </div>

      {/* Live Stream Terminal Box */}
      <div className="ai-terminal-window">
        <div className="terminal-header font-mono">
          <div className="terminal-header-title">
            <Terminal size={14} className="terminal-icon" />
            <span>stream_consumer.ts</span>
          </div>
          <div className="terminal-status-badge">
            <span
              className={`status-dot ${
                streamStatus === 'STREAMING' ? 'status-dot-active' : streamStatus === 'COMPLETED' ? '' : 'status-dot-paused'
              }`}
            ></span>
            <span>STATUS: {streamStatus}</span>
          </div>
        </div>

        <div className="terminal-body">
          <div className="terminal-prompt-row font-mono">
            <span className="prompt-prefix">user@terminal:~$</span>
            <span className="prompt-text">{activePreset.prompt}</span>
          </div>

          <div className="terminal-output-row">
            {streamedText.length > 0 ? (
              <div className="stream-content font-mono">
                {streamedText}
                {isStreaming && <span className="stream-cursor">█</span>}
              </div>
            ) : (
              <div className="stream-placeholder font-mono">
                {streamStatus === 'CONNECTING' ? 'Establishing SSE connection & awaiting first chunk...' : 'Ready to stream. Click "Start Token Stream" below.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard */}
      <div className="ai-telemetry-row font-mono">
        <div className="telemetry-box">
          <span className="t-label">TIME TO FIRST TOKEN (TTFT)</span>
          <span className="t-val">{measuredTtft !== null ? `${measuredTtft} ms` : '—'}</span>
        </div>

        <div className="telemetry-box">
          <span className="t-label">TOKENS RECEIVED</span>
          <span className="t-val">{tokenCount}</span>
        </div>

        <div className="telemetry-box">
          <span className="t-label">STREAM PROTOCOL</span>
          <span className="t-val">HTTP/2 SSE (Chunked)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="stream-action-buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={startStream}
          disabled={isStreaming}
        >
          <Play size={14} />
          <span>{isStreaming ? 'Streaming Tokens...' : 'Start Token Stream'}</span>
        </button>

        <button
          type="button"
          className="btn btn-sm"
          onClick={resetStream}
          disabled={streamStatus === 'IDLE'}
        >
          <RotateCcw size={13} />
          <span>Reset Stream</span>
        </button>
      </div>
    </div>
  );
};
