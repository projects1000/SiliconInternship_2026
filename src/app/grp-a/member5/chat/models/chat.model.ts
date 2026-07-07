export type ChatSender = 'Ram' | 'Shyam';

export interface ChatMessage {
  sender: ChatSender;
  text: string;
  timestamp: Date;
}

export interface PhoneMessage {
  text: string;
  type: 'sent' | 'received';
  timestamp: Date;
}

export interface SideNotification {
  from: string;
  text: string;
  visible: boolean;
}
