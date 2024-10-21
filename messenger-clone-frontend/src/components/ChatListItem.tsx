interface ChatListInterface {
  user: string;
  lastMessage: string;
  onClick: () => void;
}

export default function ChatListItem({
  user,
  lastMessage,
  onClick,
}: ChatListInterface) {
  return (
    <div className="chat-list-item" onClick={onClick}>
      <div className="avatar" />
      <div className="chat-info">
        <div className="chat-name">{user}</div>
        <div className="chat-preview">{lastMessage}</div>
      </div>
    </div>
  );
}
