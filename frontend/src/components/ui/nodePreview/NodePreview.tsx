import { useParams } from 'react-router';

export function NodePreview() {
  const { treeId, nodeId } = useParams();

  return (
    <div>
      <h1>
        Node Preview Page, {treeId} {nodeId}
      </h1>
    </div>
  );
}
