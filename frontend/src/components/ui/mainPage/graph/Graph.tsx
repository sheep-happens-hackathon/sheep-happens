import {
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphData } from './useGraphData';
import { useCallback, useEffect } from 'react';
import { getLayoutedElements } from './getLayoutedElements';

export function Graph() {
  const { fitView } = useReactFlow();
  const { edges: initialEdges, nodes: initialNodes } = useGraphData();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: string) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, direction);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, fitView, setNodes, setEdges]
  );

  useEffect(() => {
    onLayout('TB');
  }, [onLayout]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesDraggable={false}
      nodesConnectable={false}
      colorMode={'dark'}
    />
  );
}
