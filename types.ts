export type AgentId = 'website' | 'contacts' | 'insights' | 'analyzer';

export interface ActionBtn {
  label: string;
  primary?: boolean;
  id: string;
}

export type ChatMessage =
  | { kind: 'agent'; agentId: AgentId; text: string; time: string; actions?: ActionBtn[]; items?: Array<{ title: string; domain: string; color: string }> }
  | { kind: 'user'; text: string; time: string }

  | { kind: 'task-running'; label: string }
  | { kind: 'task-thinking'; steps: string[] }
  | { kind: 'task-done'; label: string; summary: string }
  | { kind: 'chart'; chartId: string }
  | { kind: 'suggestions'; pills: string[] };

export interface HistoryItem {
  id: string;
  agentId: AgentId;
  title: string;
  preview: string;
}
