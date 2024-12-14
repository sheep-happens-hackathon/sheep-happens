import { TreeDescription, Node } from '@/types/types';
import { IDAO } from './IDAO';
import { api } from '@/api/backend/api';

export type DbNode = {
  id: number;
  title: string;
  content: string;
  parentNodeId: number | null;
  isFinal: boolean;
};

export class DbDAO implements IDAO {
  async getUser(username: string): Promise<number> {
    const rawResponse = await api('users/id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: username }),
    });
    const textId = await rawResponse.text();
    return parseInt(textId);
  }

  async getTrees(userId: number): Promise<TreeDescription[]> {
    const rawResponse = await api(`users/${userId}/trees`);
    const textTrees = await rawResponse.text();
    return JSON.parse(textTrees);
  }

  async getNodes(treeId: number): Promise<Node[]> {
    const rawResponse = await api(`trees/${treeId}`);
    const textNodes = await rawResponse.text();
    const dbNodes = JSON.parse(textNodes) as DbNode[];
    return dbNodes.map((dbNode) => ({
      id: dbNode.id,
      title: dbNode.title,
      content: dbNode.content,
      parentId: dbNode.parentNodeId,
      isFinal: dbNode.isFinal,
    }));
  }

  async createTree(
    userId: number,
    tree: Omit<TreeDescription, 'id'>
  ): Promise<number> {
    const rawResponse = await api('trees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title: tree.title,
        content: tree.content,
      }),
    });
    const textId = await rawResponse.text();
    return parseInt(textId);
  }

  async createNode(treeId: number, nodes: Omit<Node, 'id'>[]): Promise<void> {
    await api('nodes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nodes: nodes.map((node) => ({
          title: node.title,
          content: node.content,
          parentNodeId: node.parentId,
          isFinal: node.isFinal,
          treeId,
        })),
      }),
    });
  }
}
