import { useState } from "react";
import "./App.css";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import MessageBubble from "./components/MessageBubble";
import Login from "./components/Login";
import useAuthStore from "./AuthStore";
import { useMessages, useUserList } from "./tanstackQuery";

function App() {
  const userId1 = useAuthStore((state) => state.user);

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const { data: users } = useUserList();
  const { data: messages } = useMessages(selectedConversationId);

  return (
    <>
      {userId1 ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            background: "white",
          }}
        >
          <ChatSidebar
            users={users || []}
            getConversationId={(id) => setSelectedConversationId(id)}
            userId1={userId1}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ChatHeader user={selectedConversationId?.toString() || ""} />

            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {messages?.map((message, index) => (
                <MessageBubble
                  key={index}
                  content={message.content}
                  sent={message.sent}
                />
              ))}
            </div>

            <ChatInput conversationId={selectedConversationId || 0} />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
