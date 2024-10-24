import { useEffect, useState } from "react";
import "./App.css";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import MessageBubble from "./components/MessageBubble";
import axios from "axios";

interface MessageInterface {
  content: string;
  sent: boolean;
}

function App() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (selectedConversationId !== null) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_APP_API_URL
            }/api/message/${selectedConversationId}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("There was an error fetching the messages!", error);
        }
      };
      fetchMessages();
    }
  }, [selectedConversationId]);

  console.log("messages", messages);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "white",
      }}
    >
      <ChatSidebar onChatSelect={(id) => setSelectedConversationId(id)} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatHeader user={`Conversation ${selectedConversationId}`} />

        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              content={message.content}
              sent={message.sent}
            />
          ))}
        </div>

        <ChatInput onSend={() => console.log("Message sent")} />
      </div>
    </div>
  );
}

export default App;
