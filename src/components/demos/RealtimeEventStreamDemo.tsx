import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sliders } from 'lucide-react';
import './Demos.css';

interface RealtimeEvent {
  id: string;
  timestamp: string;
  type: 'user.joined' | 'message.sent' | 'typing.started' | 'presence.heartbeat' | 'state.delta';
  source: 'Client A' | 'Client B' | 'Cluster Node 1' | 'Redis Bus';
  payload: string;
}

const sampleEvents: Omit<RealtimeEvent, 'id' | 'timestamp'>[] = [
  { type: 'user.joined', source: 'Client A', payload: '{"userId":"usr_482","room":"engineering","role":"peer"}' },
  { type: 'presence.heartbeat', source: 'Client A', payload: '{"userId":"usr_482","ttl":15,"lease":"renewed"}' },
  { type: 'typing.started', source: 'Client A', payload: '{"userId":"usr_482","channel":"#general"}' },
  { type: 'message.sent', source: 'Client A', payload: '{"msgId":"m_9381","bytes":128,"e2ee":true}' },
  { type: 'state.delta', source: 'Redis Bus', payload: '{"deltaSeq":1042,"op":"patch","keys":["canvas_cursor"]}' },
  { type: 'user.joined', source: 'Client B', payload: '{"userId":"usr_109","room":"engineering","role":"peer"}' },
  { type: 'message.sent', source: 'Client B', payload: '{"msgId":"m_9382","bytes":84,"ack":true}' }
];

export const RealtimeEventStreamDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [eventRateMs, setEventRateMs] = useState<number>(1200);
  const [events, setEvents] = useState<RealtimeEvent[]>([
    {
      id: 'evt-1',
      timestamp: '12:41:03.104',
      type: 'user.joined',
      source: 'Client A',
      payload: '{"userId":"usr_482","room":"engineering","role":"peer"}'
    },
    {
      id: 'evt-2',
      timestamp: '12:41:04.218',
      type: 'presence.heartbeat',
      source: 'Client A',
      payload: '{"userId":"usr_482","ttl":15,"lease":"renewed"}'
    },
    {
      id: 'evt-3',
      timestamp: '12:41:05.340',
      type: 'typing.started',
      source: 'Client A',
      payload: '{"userId":"usr_482","channel":"#general"}'
    }
  ]);
  const [selectedEvent, setSelectedEvent] = useState<RealtimeEvent | null>(null);

  const sampleIndexRef = useRef<number>(3);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const template = sampleEvents[sampleIndexRef.current % sampleEvents.length];
      sampleIndexRef.current += 1;

      const newEvt: RealtimeEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: timeStr,
        type: template.type,
        source: template.source,
        payload: template.payload
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 19)]);
    }, eventRateMs);

    return () => clearInterval(interval);
  }, [isRunning, eventRateMs]);

  const clearEvents = () => {
    setEvents([]);
    setSelectedEvent(null);
  };

  const getEventBadgeClass = (type: RealtimeEvent['type']) => {
    switch (type) {
      case 'user.joined':
        return 'badge-emerald';
      case 'message.sent':
        return 'badge-cyan';
      case 'typing.started':
        return 'badge-amber';
      case 'state.delta':
        return 'badge';
      default:
        return 'badge';
    }
  };

  return (
    <div className="demo-card">
      {/* Cluster Topology Visual */}
      <div className="rt-topology-diagram font-mono">
        <div className="rt-node">Client A</div>
        <div className="rt-arrow">── WSS ──►</div>
        <div className="rt-node rt-node-highlight">Realtime Node #1</div>
        <div className="rt-arrow">── Redis Pub/Sub ──►</div>
        <div className="rt-node rt-node-highlight">Realtime Node #2</div>
        <div className="rt-arrow">── WSS ──►</div>
        <div className="rt-node">Client B</div>
      </div>

      {/* Controls Bar */}
      <div className="stream-controls-bar">
        <div className="controls-left">
          <button
            type="button"
            className={`btn btn-sm ${isRunning ? 'btn-primary' : ''}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause size={13} /> : <Play size={13} />}
            <span>{isRunning ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>

          <button
            type="button"
            className="btn btn-sm"
            onClick={clearEvents}
            title="Clear current event log"
          >
            <RotateCcw size={13} />
            <span>Clear Log</span>
          </button>
        </div>

        <div className="controls-right font-mono">
          <Sliders size={13} className="control-icon" />
          <span className="control-label">Interval: {eventRateMs}ms</span>
          <input
            type="range"
            min="400"
            max="3000"
            step="200"
            value={eventRateMs}
            onChange={(e) => setEventRateMs(Number(e.target.value))}
            className="rate-slider"
            aria-label="Adjust event emission speed"
          />
        </div>
      </div>

      {/* Live Event Log */}
      <div className="event-log-container">
        <div className="log-header font-mono">
          <span>LIVE EVENT INGRESS LOG ({events.length} frames)</span>
          <span className="log-status">
            <span className={`status-dot ${isRunning ? '' : 'status-dot-paused'}`}></span>
            {isRunning ? 'STREAMING' : 'PAUSED'}
          </span>
        </div>

        <div className="event-log-stream font-mono">
          {events.length === 0 ? (
            <div className="empty-log">Event log empty. Click resume or wait for new socket frames.</div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className={`event-log-row ${selectedEvent?.id === evt.id ? 'event-row-selected' : ''}`}
                onClick={() => setSelectedEvent(evt)}
              >
                <span className="evt-time">{evt.timestamp}</span>
                <span className={`badge ${getEventBadgeClass(evt.type)} evt-type`}>{evt.type}</span>
                <span className="evt-source">{evt.source}</span>
                <span className="evt-payload">{evt.payload}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="selected-event-panel font-mono">
          <div className="selected-event-header">
            <span>INSPECTED FRAME [{selectedEvent.id}]</span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
          <pre className="selected-event-code">
            <code>{JSON.stringify(JSON.parse(selectedEvent.payload), null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
