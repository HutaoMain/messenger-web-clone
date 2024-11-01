export interface UserInterface {
  id: number;
  username: string;
  conversations: ConversationInterface;
}

export interface ConversationInterface {
  conversationId: number;
  participants: string[];
  lastMessage: string;
  lastMessageTimestamp: string;
}

export interface MessageInterface {
  content: string;
  sent: boolean;
}
