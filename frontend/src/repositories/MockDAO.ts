import { wait } from '@/lib/utils';
import { IDAO } from './IDAO';
import { Node, TreeDescription } from '@/types/types';

export class MockDAO implements IDAO {
  async updateNode(dto: { nodeId: number; content: string }): Promise<void> {
    await wait();
    return Promise.resolve();
  }

  async getUser(_username: string): Promise<number> {
    await wait();
    return 1;
  }
  async getTrees(_userId: number): Promise<TreeDescription[]> {
    await wait();
    return [
      { id: 1, title: 'Michał', content: 'sdsf sf sfs fs fsf sf sf sfs fs' },
      { id: 2, title: 'Maciek', content: 'some base note content' },
      { id: 3, title: 'Wojtek', content: 'some base note content 2' },
      { id: 4, title: 'Hubert', content: 'some base note content 3' },
      {
        id: 5,
        title: '1111111111222222222233333333334444444445555555555',
        content: 'some base note content 3',
      },
    ];
  }
  async getNodes(_treeId: number): Promise<Node[]> {
    await wait();
    return [
      {
        parentId: null,
        id: 1,
        title: 'input',
        isFinal: false,
        content:
          'pierwszypierwszypier wszypierwszypierwszypierwszyp ierwszypierwszypierwszyp ierwszypierwszy',
      },
      {
        parentId: 1,
        id: 2,
        title: 'node 2',
        isFinal: false,
        content: 'drugi',
      },
      {
        parentId: 2,
        id: 3,
        title: 'node 2a',
        isFinal: false,
        content:
          'trzecipierwszypierwszypierwszypierwszypierwszypierwszypierwszypierwszypierwszypierwszy',
      },
      {
        parentId: 2,
        id: 4,
        title: 'node 2b',
        isFinal: true,
        content: 'czwarty',
      },
    ];
  }

  async createTree(
    _userId: number,
    _tree: Omit<TreeDescription, 'id'>
  ): Promise<number> {
    await wait();
    return 9;
  }

  async createNode(_treeId: number, _nodes: Omit<Node, 'id'>[]): Promise<void> {
    await wait();
    return Promise.resolve();
  }
}
