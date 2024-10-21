import "./App.css";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import MessageBubble from "./components/MessageBubble";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", background: "white" }}>
      <ChatSidebar onChatSelect={(id) => console.log("Chat selected:", id)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader user="User 1" />

        <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
          <MessageBubble content="Hey, how are you?" sent="receive" />
          <MessageBubble
            content="I'm doing great, thanks for asking!"
            sent="sent"
          />
        </div>

        <ChatInput onSend={() => console.log("Message sent")} />
      </div>
    </div>
  );
}

export default App;
