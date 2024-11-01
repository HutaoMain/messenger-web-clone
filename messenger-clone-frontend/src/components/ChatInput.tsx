import { EmojiEmotions, Image, ThumbUp, Send } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

interface ChatInputInterface {
  conversationId: number;
}

export default function ChatInput({ conversationId }: ChatInputInterface) {
  const [message, setMessage] = useState<string>("");

  async function startChatAndSendMessage(message: string) {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/message/send`, {
        conversationId,
        message,
      });

      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message", error);
    }
  }

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="input-actions">
          <EmojiEmotions className="input-action-icon" />
          <Image className="input-action-icon" />
        </div>
        <input
          className="chat-input"
          placeholder="Aa"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="input-actions">
          <ThumbUp className="input-action-icon" />
          <Send
            className="input-action-icon"
            onClick={() => startChatAndSendMessage(message)}
          />
        </div>
      </div>
    </div>
  );
}
