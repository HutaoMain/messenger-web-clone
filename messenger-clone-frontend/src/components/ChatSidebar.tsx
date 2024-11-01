import { Search } from "@mui/icons-material";
import ChatListItem from "./ChatListItem";
import { UserInterface } from "../Interface";
import axios from "axios";

interface ChatSidebarInterface {
  users: UserInterface[];
  getConversationId: (i: number) => void;
  userId1: string;
}

export default function ChatSidebar({
  users,
  getConversationId,
  userId1,
}: ChatSidebarInterface) {
  const startChat = async (userId2: number) => {
    const userIdInt1 = parseInt(userId1);

    console.log("userId1: ", userId1, "userId2: ", userId2);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/conversation/createConversation`,
        { userId1: userIdInt1, userId2: userId2 }
      );
      getConversationId(response.data.conversationId);
    } catch (error) {
      console.error("Error starting conversation", error);
    }
  };

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
        {users?.map((user) => (
          <ChatListItem
            key={user.id}
            user={user.username}
            onClick={() => startChat(user.id)}
          />
        ))}
      </div>
    </div>
  );
}
