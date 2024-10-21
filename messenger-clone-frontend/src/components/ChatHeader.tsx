import { Phone, Videocam, Info, MoreHoriz } from "@mui/icons-material";

interface ChatHeaderInterface {
  user: string;
}

export default function ChatHeader({ user }: ChatHeaderInterface) {
  return (
    <div className="chat-header">
      <div className="header-user-info">
        <div className="avatar" />
        <div className="chat-info">
          <div className="chat-name">{user}</div>
          <div className="chat-preview">Active now</div>
        </div>
      </div>
      <div className="header-actions">
        <Phone className="header-action-icon" />
        <Videocam className="header-action-icon" />
        <Info className="header-action-icon" />
        <MoreHoriz className="header-action-icon" />
      </div>
    </div>
  );
}
