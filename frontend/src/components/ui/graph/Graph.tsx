import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphData } from './useGraphData';
import { useNavigate, useParams } from 'react-router';

export function Graph() {
  const { edges, nodes } = useGraphData();
  const { treeId } = useParams();
  const navigate = useNavigate();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      colorMode={'dark'}
      onNodeClick={(_event, node) => {
        if (node.id === '0') navigate(`/trees/${treeId}`);
        else navigate(`/trees/${treeId}/nodes/${node.id}`);
      }}
    />
  );
}
