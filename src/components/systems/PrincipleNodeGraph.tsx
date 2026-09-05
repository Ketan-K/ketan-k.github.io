import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SystemPrincipleFlow } from '../../types';
import './PrincipleNodeGraph.css';

interface PrincipleNodeGraphProps {
  flow: SystemPrincipleFlow;
}

export const PrincipleNodeGraph: React.FC<PrincipleNodeGraphProps> = ({ flow }) => {
  if (!flow || !flow.nodes || flow.nodes.length === 0) {
    return null;
  }

  // Detect if there is a single root node that branches into multiple children
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
      <div className="flow-diagram-container">
        <div className="flow-tree-layout">
          {rootNode && (
            <div className="flow-tree-root">
              <span className="flow-node-title font-mono">{rootNode.label}</span>
              {rootNode.note && <span className="flow-node-note">{rootNode.note}</span>}
            </div>
          )}
          <div className="flow-tree-branches">
            {branchNodes.map((node, index) => {
              if (!node) return null;
              const isLast = index === branchNodes.length - 1;
              return (
                <div key={node.id} className="flow-branch-row">
                  <span className="flow-branch-connector font-mono" aria-hidden="true">
                    {isLast ? '└──' : '├──'}
                  </span>
                  <div className="flow-branch-node">
                    <span className="flow-node-title font-mono">{node.label}</span>
                    {node.note && <span className="flow-node-note font-mono">{node.note}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Standard sequential / linear flow
  return (
    <div className="flow-diagram-container">
      <div className="flow-sequence-layout">
        {flow.nodes.map((node, index) => {
          const isLast = index === flow.nodes.length - 1;
          const edge = flow.edges.find(([from]) => from === node.id);
          const edgeLabel = edge && edge[2];

          return (
            <React.Fragment key={node.id}>
              <div className="flow-sequence-node">
                <div className="flow-node-content">
                  <span className="flow-node-title font-mono">{node.label}</span>
                  {node.note && <span className="flow-node-note">{node.note}</span>}
                </div>
              </div>

              {!isLast && (
                <div className="flow-connector">
                  <ArrowDown size={14} className="flow-arrow-icon" />
                  {edgeLabel && <span className="flow-edge-label font-mono">{edgeLabel}</span>}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
