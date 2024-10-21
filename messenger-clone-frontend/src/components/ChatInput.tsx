import { EmojiEmotions, Image, ThumbUp, Send } from "@mui/icons-material";

interface ChatInputInterface {
  onSend: () => void;
}

export default function ChatInput({ onSend }: ChatInputInterface) {
  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="input-actions">
          <EmojiEmotions className="input-action-icon" />
          <Image className="input-action-icon" />
        </div>
        <input className="chat-input" placeholder="Aa" />
        <div className="input-actions">
          <ThumbUp className="input-action-icon" />
          <Send className="input-action-icon" onClick={onSend} />
        </div>
      </div>
    </div>
  );
}
