import Dagre from "@dagrejs/dagre";
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialEdges1, initialNodes1 } from "./nodes-edges";
import { EdgeOutput, NodeInput, NodeOutput } from "@/types/types";
import "@xyflow/react/dist/style.css";
import { useTreeStore } from "@/stores/tree-store";
import { DAO } from "@/repositories/DAO";

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

// type LearningChartProps = {
//   nodesProp: NodeInput[];
// };

const LearningChart = (props: any) => {
  const { fitView } = useReactFlow();
  const [nodes1, setNodes1, onNodesChange] = useNodesState(initialNodes1);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges1);

  const onNodeClick = (event: any, node: any) => props.onClick(node.id);
  const { nodes, setNodes } = useTreeStore();

  useEffect(() => {
    DAO.getNodes(1).then(setNodes);
  }, []);

  useEffect(() => {
    const { initialNodes, initialEdges } = transformNodesToGraph(nodes);

    lol(initialNodes, initialEdges);
  }, [nodes]);

  useEffect(() => {
    console.log("useeffect");
  }, []);

  const onLayout = useCallback(() => {
    lol(nodes1, edges);
  }, [nodes1, edges]);

  useEffect(() => {});

  const lol = (nodes: any, edges: any) => {
    const layouted = getLayoutedElements(nodes, edges, "TB");

    setNodes1([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  };

  const transformNodesToGraph = useCallback(
    (
      nodes: NodeInput[]
    ): {
      initialNodes: NodeOutput[];
      initialEdges: EdgeOutput[];
    } => {
      const initialNodes: NodeOutput[] = [];
      const initialEdges: EdgeOutput[] = [];

      const nodePositionMap = new Map<number, { x: number; y: number }>();
      let currentX = 0;
      let currentY = 0;
      const yStep = 100;

      // Generate nodes with positions
      for (const node of nodes) {
        const nodeId = node.id.toString();
        const position =
          node.parentId === null
            ? { x: currentX, y: currentY }
            : {
                x: nodePositionMap.get(node.parentId)?.x ?? 0,
                y: currentY,
              };

        initialNodes.push({
          id: nodeId,
          type: node.parentId === null ? "input" : undefined,
          data: { label: node.title },
          position,
          style: { backgroundColor: node.isFinal ? "red" : "dodgerblue" },
        });

        nodePositionMap.set(node.id, position);
        currentY += yStep;
      }

      // Generate edges
      for (const node of nodes) {
        if (node.parentId !== null) {
          const edgeId = `e${node.parentId}${node.id}`;
          initialEdges.push({
            id: edgeId,
            source: node.parentId.toString(),
            target: node.id.toString(),
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "white",
            },
          });
        }
      }
      console.log(initialEdges);

      return { initialNodes, initialEdges };
    },
    []
  );

  return (
    <ReactFlow
      nodes={nodes1}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      nodesDraggable={false}
      elementsSelectable={true}
      onNodeClick={onNodeClick}
      nodesConnectable={false}
      colorMode={"dark"}
    >
      <Background />
      <Panel position="top-right">
        <button onClick={() => onLayout()}>vertical layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default LearningChart;
