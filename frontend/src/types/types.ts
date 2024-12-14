export type Node = {
  parentId: number | null;
  id: number;
  title: string;
  isFinal: boolean;
  content: string;
};

export type Chat = {
  chatId: number;
  chatTitle: string;
};

export type TreeDescription = {
  id: number;
  title: string;
  content: string;
};
