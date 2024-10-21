import { Search } from "@mui/icons-material";
import ChatListItem from "./ChatListItem";
import { useEffect, useState } from "react";
import axios from "axios";

interface ChatSidebarInterface {
  onChatSelect: (i: number) => void;
}

interface ConversationInterface {
  conversationId: number;
  participants: string[];
  lastMessage: string;
  lastMessageTimestamp: string;
}

export default function ChatSidebar({ onChatSelect }: ChatSidebarInterface) {
  const [conversations, setConversations] = useState<ConversationInterface[]>(
    []
  );

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/conversation/list`
        );
        setConversations(response.data);
      } catch (error) {
        console.error("There was an error fetching the conversations!", error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Chats</h1>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <Search />
          <input placeholder="Search Messenger" />
        </div>
      </div>
      <div className="chat-list">
        {conversations.map((conversation) => (
          <ChatListItem
            key={conversation.conversationId}
            user={conversation.participants.join(", ")}
            lastMessage={conversation.lastMessage}
            onClick={() => onChatSelect(conversation.conversationId)}
          />
        ))}
      </div>
    </div>
  );
}
