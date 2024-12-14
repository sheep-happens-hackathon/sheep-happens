import { useTreeStore } from '@/stores/tree-store';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Node } from '@/types/types';
import { RetryInput } from './RetryInput';
import { TextContent } from './TextContent';
import { extendNoteFragments, improveNote } from '@/api/ai/queries';
import { DAO } from '@/repositories/DAO';
import { NodeUpdateDto } from '@/repositories/IDAO';

export function NodePreview() {
  const node = useNode();
  const [isRetryInputShown, setIsRetryInputShown] = useState(false);
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);
  const { treeId } = useParams();
  const { setNodes, updateNode } = useTreeStore();

  const generate = useCallback(async () => {
    if (node === null || treeId === undefined) return;
    console.log('chat gpt phrases', selectedPhrases);
    const response = await extendNoteFragments(node.content, selectedPhrases);
    console.log('chat gpt response', response);
    const treeIdNum = parseInt(treeId);
    const newNodes: Omit<Node, 'id'>[] = response.map((chatNode) => ({
      title: chatNode.title,
      content: chatNode.content,
      treeId: treeIdNum,
      parentId: node.id,
      isFinal: false,
    }));
    await DAO.createNode(treeIdNum, newNodes);
    await DAO.getNodes(parseInt(treeId as string)).then(setNodes);
  }, [node, selectedPhrases, setNodes, treeId]);

  const regenerateNote = useCallback(
    async (tipFromUser: string) => {
      if (node === null) return;
      console.log('regenerating note', tipFromUser);
      const response = await improveNote(node.content, tipFromUser);
      console.log('response from chat', response);
      const newNode: Node = {
        id: node.id,
        content: response.content,
        title: node.title,
        isFinal: false,
        parentId: node.parentId,
      };
      updateNode(newNode);
      await DAO.updateNode({
        nodeId: node.id,
        content: response.content,
      });
    },
    [updateNode, node]
  );

  const markAsLeaf = useCallback(async () => {
    if (node === null) return;
    const newNode: Node = {
      ...node,
      isFinal: !node.isFinal,
    };
    updateNode(newNode);
    await DAO.updateNode({
      nodeId: node.id,
      content: node.content,
      isFinal: !node.isFinal,
    });
  }, [node, updateNode]);

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1  relative'>
        <div className='absolute top-0 left-0 bottom-0 right-0 overflow-y-scroll pt-16 pl-12 pr-16'>
          <h1 className='font-bold text-xl mb-2'>{node?.title}</h1>
          <TextContent
            originalText={node?.content ?? ''}
            setIsRetryInputShown={setIsRetryInputShown}
            generate={generate}
            setSelectedPhrases={setSelectedPhrases}
            markAsLeaf={markAsLeaf}
          />
        </div>
      </div>
      <RetryInput
        isShown={isRetryInputShown}
        setIsShown={setIsRetryInputShown}
        regenerateNote={regenerateNote}
      />
    </div>
  );
}

function useNode(): Node | null {
  const { nodeId } = useParams();
  const { nodes } = useTreeStore();

  return useMemo(
    () => nodes.find((n) => n.id.toString() === nodeId) ?? null,
    [nodeId, nodes]
  );
}
