import { MarkerType } from "@xyflow/react";

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
  isFinal: boolean;
};

export type EdgeOutput = {
  id: string;
  source: string;
  target: string;
  markerEnd: {
    type: MarkerType;
    width: number;
    height: number;
    color: string;
  };
};

export type Chat = {
  chatId: number;
  chatTitle: string;
};
