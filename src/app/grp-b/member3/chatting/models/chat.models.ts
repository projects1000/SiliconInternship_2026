export type ChatUserId = 'User 1' | 'User 2';

export interface ChatUser {
  id: ChatUserId;
  name: string;
  initials: string;
  accent: string;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  sender: ChatUserId;
  text: string;
  timestamp: Date;
}
