import { NodeInput, TreeDescription } from "@/types/types";

export interface IDAO {
  /**
   * Takes username and returns user id.
   */
  getUser(username: string): Promise<number>;

  getTrees(userId: number): Promise<TreeDescription[]>;

  getNodes(treeId: number): Promise<NodeInput[]>;
}
