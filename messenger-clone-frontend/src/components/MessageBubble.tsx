interface MessageBubbleInterface {
  content: string;
  sent: boolean;
}

export default function MessageBubble({
  content,
  sent,
}: MessageBubbleInterface) {
  return (
    <div className={`message-bubble ${sent ? "sent" : "received"}`}>
      {!sent && <div className="avatar" />}
      <div className="message-content">
        <p>{content}</p>
      </div>
    </div>
  );
}
