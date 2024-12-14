import { Node as RawNode } from '@/types/types';
import { MarkerType, Node, Edge } from '@xyflow/react';

export const parseNodes = (
  rawNodes: RawNode[]
): {
  nodes: Node[];
  edges: Edge[];
} => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (const rawNode of rawNodes) {
    const nodeId = rawNode.id.toString();
    nodes.push({
      id: nodeId,
      type: rawNode.parentId === null ? 'input' : undefined,
      data: { label: rawNode.title },
      position: { x: 0, y: 0 },
      style: { backgroundColor: rawNode.isFinal ? 'red' : 'dodgerblue' },
    });
  }

  for (const node of rawNodes) {
    if (node.parentId === null) continue;

    const edgeId = `e${node.parentId}${node.id}`;
    edges.push({
      id: edgeId,
      source: node.parentId.toString(),
      target: node.id.toString(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: 'dodgerblue',
      },
    });
  }

  return { nodes, edges };
};
