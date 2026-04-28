export type AgentId = 'website' | 'contacts' | 'insights';

export interface ActionBtn {
  label: string;
  primary?: boolean;
  id: string;
}

export type ChatMessage =
  | { kind: 'agent'; agentId: AgentId; text: string; time: string; actions?: ActionBtn[] }
  | { kind: 'user'; text: string; time: string }

  | { kind: 'task-running'; label: string }
  | { kind: 'task-done'; label: string; summary: string };

export interface HistoryItem {
  id: string;
  agentId: AgentId;
  title: string;
  preview: string;
}
