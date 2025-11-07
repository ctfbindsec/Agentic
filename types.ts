export type View = 'orchestrator' | 'chat' | 'image' | 'grounding' | 'framework';

export interface OptimizationSelections {
  tree: string;
  func: string;
  model: string;
  algo: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export type GroundingChunk = {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets: {
        uri: string;
        text: string;
      }[];
    };
  };
};