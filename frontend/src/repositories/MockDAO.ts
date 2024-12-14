import { wait } from '@/lib/utils';
import { IDAO } from './IDAO';

export class MockDAO implements IDAO {
  async getUser(_username: string): Promise<number> {
    await wait();
    return 1;
  }
}
