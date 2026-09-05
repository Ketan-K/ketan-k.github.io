import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { SystemPrincipleFlow } from '../../types';
import './PrincipleNodeGraph.css';

interface PrincipleNodeGraphProps {
  flow: SystemPrincipleFlow;
}

export const PrincipleNodeGraph: React.FC<PrincipleNodeGraphProps> = ({ flow }) => {
  if (!flow || !flow.nodes || flow.nodes.length === 0) {
    return null;
  }

  // Detect branching vs sequential flow
  const outDegreeMap = new Map<string, string[]>();
  flow.edges.forEach((edge) => {
    const [from, to] = edge;
    const targets = outDegreeMap.get(from) || [];
    targets.push(to);
    outDegreeMap.set(from, targets);
  });

  const rootId = flow.nodes[0]?.id;
  const rootOutgoing = outDegreeMap.get(rootId) || [];
  const isBranchingTree = rootOutgoing.length > 1;

  if (isBranchingTree) {
    const rootNode = flow.nodes.find((n) => n.id === rootId);
    const branchNodes = rootOutgoing
      .map((toId) => flow.nodes.find((n) => n.id === toId))
      .filter(Boolean);

    return (
      <div className="flow-card">
        <div className="flow-card-header font-mono">
          <span className="flow-card-label">CLASSIFICATION TOPOLOGY</span>
          <span className="flow-card-meta">{branchNodes.length} Branches</span>
        </div>

        <div className="flow-tree-wrapper">
          {rootNode && (
            <div className="flow-tree-root-node">
              <span className="flow-node-index font-mono">ROOT</span>
              <span className="flow-node-text font-mono">{rootNode.label}</span>
            </div>
          )}

          <div className="flow-tree-rail">
            {branchNodes.map((node, index) => {
              if (!node) return null;
              const isLast = index === branchNodes.length - 1;
              return (
                <div key={node.id} className="flow-tree-branch-item">
                  <div className="flow-branch-line" aria-hidden="true">
                    <span className="branch-glyph font-mono">{isLast ? '└──' : '├──'}</span>
                  </div>
                  <div className="flow-branch-content">
                    <div className="flow-branch-primary">
                      <span className="flow-node-index font-mono">{`0${index + 1}`}</span>
                      <span className="flow-node-text font-mono">{node.label}</span>
                    </div>
                    {node.note && (
                      <div className="flow-branch-secondary">
                        <ArrowRight size={12} className="flow-branch-arrow" />
                        <span className="flow-branch-target font-mono">{node.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Sequential pipeline layout
  const isDecision = flow.nodes.length === 2 && flow.edges.some((e) => Boolean(e[2]));

  return (
    <div className="flow-card">
      <div className="flow-card-header font-mono">
        <span className="flow-card-label">{isDecision ? 'DECISION GATE' : 'EXECUTION PIPELINE'}</span>
        <span className="flow-card-meta">{flow.nodes.length} Stages</span>
      </div>

      <div className="flow-pipeline-grid">
        {flow.nodes.map((node, index) => {
          const isLast = index === flow.nodes.length - 1;
          const edge = flow.edges.find(([from]) => from === node.id);
          const edgeLabel = edge && edge[2];
          const stepNumber = String(index + 1).padStart(2, '0');

          return (
            <div key={node.id} className="flow-step-wrapper">
              <div className={`flow-node-box ${isLast ? 'flow-node-box-final' : ''}`}>
                <div className="flow-node-header font-mono">
                  <span className="flow-node-index font-mono">{stepNumber}</span>
                  {isLast && <span className="flow-node-status font-mono">STABLE</span>}
                </div>
                <div className="flow-node-body">
                  <span className="flow-node-text font-mono">{node.label}</span>
                  {node.note && <span className="flow-node-note">{node.note}</span>}
                </div>
              </div>

              {!isLast && (
                <div className="flow-connector-track">
                  <div className="flow-connector-line" />
                  <div className="flow-connector-arrow">
                    <ArrowRight size={14} className="flow-arrow-h" />
                    <ArrowDown size={14} className="flow-arrow-v" />
                  </div>
                  {edgeLabel && (
                    <span className="flow-connector-annotation font-mono">{edgeLabel}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
