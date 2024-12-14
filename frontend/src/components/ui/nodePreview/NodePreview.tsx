import { DAO } from "@/repositories/DAO";
import { useTreeStore } from "@/stores/tree-store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MultiTextHighlighter } from "../mainPage/Highlight";

export function NodePreview() {
  const { nodeId } = useParams();
  const { nodes } = useTreeStore();
  const [nodeText, setNodeText] = useState("");

  useEffect(() => {
    if (nodeId === undefined) return;
    const nodeById = nodes.filter((node) => {
      return node.id === parseInt(nodeId);
    })[0];
    if (nodeById === undefined) return;
    setNodeText(nodeById.content);
  }, [nodeId, nodes]);

  return (
    <div className="m-2 mt-12">
      <MultiTextHighlighter text={nodeText} />
    </div>
  );
}
