import React from 'react';
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Radio,
  Wifi,
  Zap,
  Database,
  HardDrive,
  Server,
  Globe,
  ShieldCheck,
  Box,
  Sparkles,
  Brain,
  Video,
  PhoneCall,
  Activity,
  FileCode,
  Workflow,
  Cloud,
  Flame,
  Binary
} from 'lucide-react';

interface TechBadgeProps {
  name: string;
  className?: string;
  variant?: 'default' | 'accent' | 'cyan' | 'emerald' | 'simulated';
  size?: 'sm' | 'md';
  showIcon?: boolean;
  onClick?: () => void;
}

// Map tech names to appropriate semantic micro-icons
const getTechIcon = (name: string): React.ReactNode => {
  const n = name.toLowerCase().trim();
  const iconProps = { size: 12, strokeWidth: 2, className: "tech-badge-icon", "aria-hidden": true };

  // Real-Time & Communications
  if (n.includes('webrtc')) return <Radio {...iconProps} />;
  if (n.includes('websocket') || n.includes('socket.io') || n.includes('sse') || n.includes('server-sent')) return <Zap {...iconProps} />;
  if (n.includes('janus') || n.includes('sfu') || n.includes('mcu') || n.includes('media server')) return <Server {...iconProps} />;
  if (n.includes('sip') || n.includes('pbx') || n.includes('telephony')) return <PhoneCall {...iconProps} />;
  if (n.includes('stun') || n.includes('turn') || n.includes('ice') || n.includes('protocol') || n.includes('network')) return <Wifi {...iconProps} />;
  if (n.includes('getstats') || n.includes('telemetry') || n.includes('vad') || n.includes('activity')) return <Activity {...iconProps} />;
  if (n.includes('stream') || n.includes('event')) return <Workflow {...iconProps} />;

  // Languages & Core
  if (n.includes('typescript') || n.includes('javascript') || n.includes('es6') || n.includes('rxjs')) return <FileCode {...iconProps} />;
  if (n.includes('node') || n.includes('express') || n.includes('sails')) return <Terminal {...iconProps} />;
  if (n.includes('html') || n.includes('css') || n.includes('sass') || n.includes('less')) return <Layers {...iconProps} />;

  // Frontend Frameworks
  if (n.includes('react') || n.includes('angular') || n.includes('vue') || n.includes('svelte')) return <Code2 {...iconProps} />;

  // Databases & Storage
  if (n.includes('redis') || n.includes('cache')) return <Flame {...iconProps} />;
  if (n.includes('mongo') || n.includes('sql') || n.includes('postgres') || n.includes('mysql') || n.includes('database')) return <Database {...iconProps} />;

  // AI & Systems
  if (n.includes('ai') || n.includes('llm') || n.includes('machine learning') || n.includes('neural')) return <Brain {...iconProps} />;
  if (n.includes('mediapipe') || n.includes('banuba') || n.includes('video') || n.includes('camera') || n.includes('canvas')) return <Video {...iconProps} />;
  if (n.includes('spark') || n.includes('prompt') || n.includes('vector')) return <Sparkles {...iconProps} />;

  // Infrastructure & Tools
  if (n.includes('docker') || n.includes('container') || n.includes('sandbox')) return <Box {...iconProps} />;
  if (n.includes('aws') || n.includes('cloud')) return <Cloud {...iconProps} />;
  if (n.includes('jwt') || n.includes('auth') || n.includes('crypto') || n.includes('wallet')) return <ShieldCheck {...iconProps} />;
  if (n.includes('api') || n.includes('rest') || n.includes('http') || n.includes('whatsapp')) return <Globe {...iconProps} />;
  if (n.includes('schema') || n.includes('zod') || n.includes('json') || n.includes('fsm') || n.includes('finite state')) return <Binary {...iconProps} />;
  if (n.includes('citrix') || n.includes('sdk')) return <HardDrive {...iconProps} />;

  // Default fallback
  return <Cpu {...iconProps} />;
};

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  className = '',
  variant = 'default',
  size = 'md',
  showIcon = true,
  onClick
}) => {
  const variantClass = variant !== 'default' ? `badge-${variant}` : '';
  const sizeClass = size === 'sm' ? 'badge-sm' : '';
  const interactiveClass = onClick ? 'badge-interactive' : '';

  return (
    <span
      className={`badge ${variantClass} ${sizeClass} ${interactiveClass} ${className}`.trim()}
      onClick={onClick}
    >
      {showIcon && getTechIcon(name)}
      <span className="badge-text">{name}</span>
    </span>
  );
};
