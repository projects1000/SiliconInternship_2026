export type MessageType = 'text' | 'image' | 'file';

export interface ChatMessage {
  id: string;
  senderId: 'userA' | 'userB';
  senderName: string;
  message: string;
  type: MessageType;
  fileName?: string;
  fileUrl?: string;
  fileSize?: string;
  timestamp: Date;
}

export interface ChatStatistics {
  totalMessages: number;
  filesShared: number;
  imagesShared: number;
  lastMessage: ChatMessage | null;
  activeSubscribers: number;
}
