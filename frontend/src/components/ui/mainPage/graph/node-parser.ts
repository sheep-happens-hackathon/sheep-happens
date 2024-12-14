import { Node as RawNode } from "@/types/types";
import { MarkerType, Node, Edge } from "@xyflow/react";

export const parseNodes = (
  rawNodes: RawNode[]
): {
  nodes: Node[];
  edges: Edge[];
} => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const cords = [
    [0, 0],
    [-200, 100],
    [0, 100],
    [200, 100],
    [-100, 200],
    [300, 200],
    [200, 300],
  ];

  nodes.push({
    id: "0",
    type: "input",
    data: { label: "Oryginalna notatka" },
    position: { x: 0, y: -100 },
    style: { backgroundColor: "#7D3F9F", borderRadius: 15 },
  });

  let i = 0;
  for (const rawNode of rawNodes) {
    const nodeId = rawNode.id.toString();
    nodes.push({
      id: nodeId,
      data: { label: rawNode.title },
      position: { x: cords[i]![0]!, y: cords[i]![1]! },
      style: {
        backgroundColor: rawNode.isFinal ? "#FE4E00" : "#F0B000",
        borderRadius: 15,
      },
    });
    i++;
  }

  for (const node of rawNodes) {
    if (node.parentId === null) {
      const edgeId = `e0${node.id}`;
      edges.push({
        id: edgeId,
        source: "0",
        target: node.id.toString(),
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#F0B000",
        },
      });
      continue;
    }

    const edgeId = `e${node.parentId}${node.id}`;
    edges.push({
      id: edgeId,
      source: node.parentId.toString(),
      target: node.id.toString(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#F0B000",
      },
    });
  }

  return { nodes, edges };
};
