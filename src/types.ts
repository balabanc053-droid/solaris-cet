export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'design' | 'traffic' | 'marketing' | 'security' | 'bridge';
  message: string;
  impact: number; // 0-100
}

export interface BridgeStats {
  stability: number;
  intelligence: number;
  safety: number;
  usefulness: number;
}

export interface RepoFile {
  path: string;
  content: string;
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'design' | 'marketing' | 'code' | 'security';
  repo?: { owner: string; name: string };
  codeChanges?: RepoFile[];
  status: 'pending' | 'applied' | 'rejected';
}
