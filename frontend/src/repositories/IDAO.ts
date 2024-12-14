import { Node, TreeDescription } from '@/types/types';

export type NodeUpdateDto = {
  nodeId: number;
  content: string;
  isFinal?: boolean;
};

export interface IDAO {
  /**
   * Takes username and returns user id.
   */
  getUser(username: string): Promise<number>;

  getTrees(userId: number): Promise<TreeDescription[]>;

  getNodes(treeId: number): Promise<Node[]>;

  /**
   * Returns new tree id.
   */
  createTree(
    userId: number,
    tree: Omit<TreeDescription, 'id'>
  ): Promise<number>;

  createNode(treeId: number, nodes: Omit<Node, 'id'>[]): Promise<void>;

  updateNode(dto: NodeUpdateDto): Promise<void>;
}
