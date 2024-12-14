import { wait } from '@/lib/utils';
import { IDAO } from './IDAO';
import { Node, TreeDescription } from '@/types/types';

export class MockDAO implements IDAO {
  async getUser(_username: string): Promise<number> {
    await wait();
    return 1;
  }
  async getTrees(_userId: number): Promise<TreeDescription[]> {
    await wait();
    return [
      { id: 1, title: 'Michał' },
      { id: 2, title: 'Maciek' },
      { id: 3, title: 'Wojtek' },
      { id: 4, title: 'Hubert' },
    ];
  }
  async getNodes(treeId: number): Promise<Node[]> {
    await wait();
    return [
      { parentId: null, id: 1, title: 'input', isFinal: false, content: '' },
      { parentId: 1, id: 2, title: 'node 2', isFinal: false, content: '' },
      { parentId: 2, id: 3, title: 'node 2a', isFinal: false, content: '' },
      { parentId: 2, id: 4, title: 'node 2b', isFinal: true, content: '' },
    ];
  }
}
