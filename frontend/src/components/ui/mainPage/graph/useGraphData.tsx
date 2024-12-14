import { useTreeStore } from '@/stores/tree-store';
import { useMemo } from 'react';
import { parseNodes } from './node-parser';

export function useGraphData() {
  const { nodes: rawNodes } = useTreeStore();

  const graphData = useMemo(() => parseNodes(rawNodes), [rawNodes]);

  return graphData;
}
