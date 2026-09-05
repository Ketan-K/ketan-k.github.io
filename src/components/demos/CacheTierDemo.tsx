import React, { useState } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import './Demos.css';

interface CacheLogItem {
  id: string;
  requestId: number;
  key: string;
  tier: 'L1 In-Memory' | 'L2 Redis' | 'Primary Database';
  result: 'HIT' | 'MISS';
  latencyMs: number;
  timestamp: string;
}

export const CacheTierDemo: React.FC = () => {
  const [requestCount, setRequestCount] = useState<number>(0);
  const [isL1Cached, setIsL1Cached] = useState<boolean>(false);
  const [isL2Cached, setIsL2Cached] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<CacheLogItem[]>([]);
  const selectedKey = 'session:usr_9182:room_meta';

  const executeRequest = () => {
    if (isLoading) return;
    setIsLoading(true);

    const nextCount = requestCount + 1;
    setRequestCount(nextCount);

    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;

    // Determine simulation response timing
    if (isL1Cached) {
      setTimeout(() => {
        const item: CacheLogItem = {
          id: `req-${Date.now()}`,
          requestId: nextCount,
          key: selectedKey,
          tier: 'L1 In-Memory',
          result: 'HIT',
          latencyMs: 0.2,
          timestamp: timeStr
        };
        setLogs((prev) => [item, ...prev]);
        setIsLoading(false);
      }, 100);
    } else if (isL2Cached) {
      setTimeout(() => {
        setIsL1Cached(true); // Populates L1
        const item: CacheLogItem = {
          id: `req-${Date.now()}`,
          requestId: nextCount,
          key: selectedKey,
          tier: 'L2 Redis',
          result: 'HIT',
          latencyMs: 2.8,
          timestamp: timeStr
        };
        setLogs((prev) => [item, ...prev]);
        setIsLoading(false);
      }, 200);
    } else {
      setTimeout(() => {
        setIsL2Cached(true);
        setIsL1Cached(true);
        const item: CacheLogItem = {
          id: `req-${Date.now()}`,
          requestId: nextCount,
          key: selectedKey,
          tier: 'Primary Database',
          result: 'MISS',
          latencyMs: 41.5,
          timestamp: timeStr
        };
        setLogs((prev) => [item, ...prev]);
        setIsLoading(false);
      }, 450);
    }
  };

  const flushCache = () => {
    setIsL1Cached(false);
    setIsL2Cached(false);
    setLogs([]);
    setRequestCount(0);
  };

  const hits = logs.filter((l) => l.result === 'HIT').length;
  const hitRate = logs.length > 0 ? ((hits / logs.length) * 100).toFixed(0) : '0';

  return (
    <div className="demo-card">
      {/* Interactive Cache Layers Visual */}
      <div className="cache-layers-grid">
        <div className={`cache-tier-box ${isL1Cached ? 'cache-tier-active' : ''}`}>
          <div className="tier-header font-mono">
            <span>TIER 1: IN-PROCESS LRU</span>
            <span className={`badge ${isL1Cached ? 'badge-emerald' : 'badge'}`}>{isL1Cached ? 'POPULATED' : 'EMPTY'}</span>
          </div>
          <div className="tier-speed font-mono">~0.1ms — 0.5ms</div>
          <p className="tier-desc">V8 Heap LRU Map with 15s TTL. Zero serialization overhead.</p>
        </div>

        <div className={`cache-tier-box ${isL2Cached ? 'cache-tier-active' : ''}`}>
          <div className="tier-header font-mono">
            <span>TIER 2: REDIS CLUSTER</span>
            <span className={`badge ${isL2Cached ? 'badge-emerald' : 'badge'}`}>{isL2Cached ? 'POPULATED' : 'EMPTY'}</span>
          </div>
          <div className="tier-speed font-mono">~2ms — 4ms</div>
          <p className="tier-desc">Distributed Redis cache shared across all Node.js cluster instances.</p>
        </div>

        <div className="cache-tier-box cache-tier-db">
          <div className="tier-header font-mono">
            <span>TIER 3: POSTGRESQL DB</span>
            <span className="badge">PERSISTENT</span>
          </div>
          <div className="tier-speed font-mono">~35ms — 50ms</div>
          <p className="tier-desc">ACID query execution with disk I/O and connection pool lock.</p>
        </div>
      </div>

      {/* Actions & Metrics Bar */}
      <div className="cache-controls-bar">
        <div className="controls-left">
          <button
            type="button"
            className="btn btn-primary"
            onClick={executeRequest}
            disabled={isLoading}
          >
            <Zap size={14} />
            <span>{isLoading ? 'Resolving Request...' : 'Trigger Read Request'}</span>
          </button>

          <button
            type="button"
            className="btn btn-sm"
            onClick={flushCache}
            title="Invalidate all cache tiers"
          >
            <RefreshCw size={13} />
            <span>Flush Cache (Evict)</span>
          </button>
        </div>

        <div className="cache-stats-summary font-mono">
          <span>REQUESTS: {logs.length}</span>
          <span className="stat-separator">·</span>
          <span>HIT RATIO: {hitRate}%</span>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="cache-log-list font-mono">
        <div className="log-header">
          <span>REQUEST EXECUTION HISTORY</span>
          <span>LATENCY DELTA</span>
        </div>

        {logs.length === 0 ? (
          <div className="empty-log">Click "Trigger Read Request" to simulate cache miss followed by subsequent hits.</div>
        ) : (
          logs.map((item) => (
            <div key={item.id} className="cache-log-item">
              <div className="log-item-left">
                <span className="log-req-idx">#{item.requestId}</span>
                <span className={`badge ${item.result === 'HIT' ? 'badge-emerald' : 'badge-amber'}`}>
                  {item.result === 'HIT' ? 'CACHE HIT' : 'CACHE MISS'}
                </span>
                <span className="log-tier-name">{item.tier}</span>
              </div>
              <div className="log-item-right">
                <span className={`log-latency ${item.result === 'HIT' ? 'latency-fast' : 'latency-slow'}`}>
                  {item.latencyMs} ms
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
