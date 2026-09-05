import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Demos.css';

interface Stage {
  id: string;
  name: string;
  category: string;
  role: string;
  description: string;
  codeSnippet: string;
  telemetry: string;
}

const stages: Stage[] = [
  {
    id: 'client',
    name: '1. Client Egress',
    category: 'Frontend Runtime',
    role: 'Request Generation & Header Injection',
    description: 'Browser client initiates fetch with authorization bearer token, idempotency key, and JSON payload.',
    codeSnippet: 'fetch("/api/v1/sessions", {\n  method: "POST",\n  headers: { "Idempotency-Key": "req_8492" }\n})',
    telemetry: 'TLS 1.3 Handshake: Reused · DNS: Cached (0ms)'
  },
  {
    id: 'gateway',
    name: '2. API Gateway & Auth',
    category: 'Edge Routing',
    role: 'TLS Termination & Rate Limiting',
    description: 'Verifies cryptographically signed JWT, enforces token bucket rate-limits (100 req/min), and forwards to upstream service.',
    codeSnippet: 'const token = verifyJwt(req.headers.authorization);\nif (!rateLimiter.consume(token.userId)) return 429;',
    telemetry: 'Rate-Limit Cost: 1 unit · JWT Check: 0.4ms'
  },
  {
    id: 'validation',
    name: '3. Input Validation',
    category: 'Security & Schema',
    role: 'Fail Fast Before Downstream Compute',
    description: 'Zod/JSON schema rejects malformed structures before allocating memory or initiating expensive database queries.',
    codeSnippet: 'const schema = z.object({ roomId: z.string().uuid() });\nconst data = schema.parse(req.body); // Strict reject',
    telemetry: 'Schema Validation: 0.2ms · Sanitization: Pass'
  },
  {
    id: 'service',
    name: '4. Service Business Logic',
    category: 'Domain Layer',
    role: 'Domain Orchestration & State Machine',
    description: 'Executes core business rules, verifies user permissions for the room, and checks cache tier before querying relational DB.',
    codeSnippet: 'await roomPolicy.assertParticipantEligible(user, roomId);\nconst cached = await cache.get(`room:${roomId}`);',
    telemetry: 'Policy Assertion: OK · Tenant Boundary: Verified'
  },
  {
    id: 'cache',
    name: '5. Tiered Cache Check',
    category: 'In-Memory State',
    role: 'Sub-Millisecond Read Optimization',
    description: 'Checks in-memory L1 and Redis L2 for serialized room session metadata to bypass primary DB load.',
    codeSnippet: '// If Cache Miss -> Execute Singleflight Query\nif (!cached) {\n  return singleflight.do(roomId, () => db.fetch(roomId));\n}',
    telemetry: 'L1 LRU: MISS · L2 Redis: HIT (2.4ms)'
  },
  {
    id: 'database',
    name: '6. Durable Persistence',
    category: 'Storage Layer',
    role: 'ACID Transaction Commit',
    description: 'Commits state changes to PostgreSQL using parameterized queries within a transactional boundary.',
    codeSnippet: 'await db.transaction(async (tx) => {\n  await tx.insert(sessionAuditLog).values(entry);\n});',
    telemetry: 'WAL Sync: Commit (11ms) · Read-Replica: Synced'
  },
  {
    id: 'response',
    name: '7. Response Delivery',
    category: 'Gateway Ingress',
    role: 'ETag Generation & JSON Ingress',
    description: 'Applies gzip/brotli compression headers, calculates weak ETag for client caching, and returns HTTP 200 OK.',
    codeSnippet: 'res.setHeader("ETag", \'W/"4f2a-7b9c"\');\nres.status(200).json({ status: "active", session });',
    telemetry: 'Payload Size: 1.4KB · Total Round-Trip: 28ms'
  }
];

export const RequestLifecycleDemo: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(2);

  const activeStage = stages[activeStageIndex];

  return (
    <div className="demo-card">
      {/* Interactive Step Bar */}
      <div className="pipeline-steps-bar">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            type="button"
            className={`pipeline-step-node ${idx === activeStageIndex ? 'pipeline-step-active' : ''} ${
              idx < activeStageIndex ? 'pipeline-step-completed' : ''
            }`}
            onClick={() => setActiveStageIndex(idx)}
          >
            <span className="step-number font-mono">0{idx + 1}</span>
            <span className="step-name">{stage.name.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Stage Inspector */}
      <div className="demo-inspector-grid">
        <div className="inspector-panel">
          <div className="panel-header font-mono">
            <span className="panel-stage-name">{activeStage.name}</span>
            <span className="badge badge-cyan">{activeStage.category}</span>
          </div>

          <div className="panel-body">
            <div className="role-tag font-mono">{activeStage.role}</div>
            <p className="stage-text">{activeStage.description}</p>

            <div className="telemetry-bar font-mono">
              <span className="telemetry-label">[SIMULATED TELEMETRY]</span>
              <span className="telemetry-data">{activeStage.telemetry}</span>
            </div>
          </div>

          <div className="panel-controls">
            <button
              type="button"
              className="btn btn-sm"
              disabled={activeStageIndex === 0}
              onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
            >
              Previous Stage
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={activeStageIndex === stages.length - 1}
              onClick={() => setActiveStageIndex((prev) => Math.min(stages.length - 1, prev + 1))}
            >
              Next Stage
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="code-panel">
          <div className="code-header font-mono">
            <span>pipeline_stage.ts</span>
            <span className="code-lang">TypeScript</span>
          </div>
          <pre className="code-block font-mono">
            <code>{activeStage.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
