import { Node, TreeDescription } from '@/types/types';

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

  createNode(node: Omit<Node, 'id'>): Promise<void>;
}
