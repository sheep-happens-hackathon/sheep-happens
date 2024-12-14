import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphData } from './useGraphData';
import { useCallback, useEffect, useState } from 'react';
import { getLayoutedElements } from './getLayoutedElements';

export function Graph() {
  const { fitView } = useReactFlow();
  const { edges: initialEdges, nodes: initialNodes } = useGraphData();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [key, setKey] = useState(0);

  const onLayout = useCallback(
    (direction: string) => {
      console.log('in layout nodes', initialNodes);
      const layouted = getLayoutedElements(nodes, edges, direction);
      console.log('in layouted layouted nodes', [...layouted.nodes]);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, initialEdges, initialNodes]
  );

  useEffect(() => {
    console.log('nodes', initialNodes, nodes);
  }, [initialNodes, edges]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [initialEdges, initialNodes]);

  useEffect(() => {
    onLayout('TB');
  }, [key]);

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
