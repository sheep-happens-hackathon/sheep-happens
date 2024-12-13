export type NodeInput = {
  parentId: number | null;
  id: number;
  title: string;
  isFinal: boolean;
};

export type NodeOutput = {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
};

export type EdgeOutput = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};

export type Chat = {
  chatId: number;
  chatTitle: string;
};
