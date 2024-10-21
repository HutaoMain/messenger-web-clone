// mockDatabase.js

// Users table
const users = {
  data: [
    {
      id: 1,
      username: "john_doe",
      fullName: "John Doe",
      email: "john@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastActive: "2024-10-21T10:30:00Z",
      status: "online",
    },
    {
      id: 2,
      username: "jane_smith",
      fullName: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      lastActive: "2024-10-21T10:28:00Z",
      status: "online",
    },
    {
      id: 3,
      username: "mike_wilson",
      fullName: "Mike Wilson",
      email: "mike@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      lastActive: "2024-10-21T09:15:00Z",
      status: "offline",
    },
    {
      id: 4,
      username: "sarah_johnson",
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      lastActive: "2024-10-21T10:25:00Z",
      status: "online",
    },
    {
      id: 5,
      username: "david_brown",
      fullName: "David Brown",
      email: "david@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      lastActive: "2024-10-20T23:45:00Z",
      status: "offline",
    },
  ],
  // Mimicking SQL indexes
  indexes: {
    username: "UNIQUE",
    email: "UNIQUE",
    status: "INDEX",
  },
};

// Conversations table (represents group chats or direct messages)
const conversations = {
  data: [
    {
      id: 1,
      type: "direct", // direct or group
      name: null, // null for direct messages
      createdAt: "2024-10-15T08:00:00Z",
      updatedAt: "2024-10-21T10:30:00Z",
    },
    {
      id: 2,
      type: "direct",
      name: null,
      createdAt: "2024-10-16T09:00:00Z",
      updatedAt: "2024-10-21T09:15:00Z",
    },
    {
      id: 3,
      type: "group",
      name: "Project Team",
      createdAt: "2024-10-17T10:00:00Z",
      updatedAt: "2024-10-21T10:28:00Z",
    },
  ],
  indexes: {
    type: "INDEX",
    updatedAt: "INDEX",
  },
};

// Conversation participants (junction table for users and conversations)
const conversationParticipants = {
  data: [
    {
      id: 1,
      conversationId: 1,
      userId: 1,
      joinedAt: "2024-10-15T08:00:00Z",
      role: "member",
    },
    {
      id: 2,
      conversationId: 1,
      userId: 2,
      joinedAt: "2024-10-15T08:00:00Z",
      role: "member",
    },
    {
      id: 3,
      conversationId: 2,
      userId: 1,
      joinedAt: "2024-10-16T09:00:00Z",
      role: "member",
    },
    {
      id: 4,
      conversationId: 2,
      userId: 3,
      joinedAt: "2024-10-16T09:00:00Z",
      role: "member",
    },
    {
      id: 5,
      conversationId: 3,
      userId: 1,
      joinedAt: "2024-10-17T10:00:00Z",
      role: "admin",
    },
    {
      id: 6,
      conversationId: 3,
      userId: 2,
      joinedAt: "2024-10-17T10:00:00Z",
      role: "member",
    },
    {
      id: 7,
      conversationId: 3,
      userId: 3,
      joinedAt: "2024-10-17T10:00:00Z",
      role: "member",
    },
  ],
  indexes: {
    conversationId: "INDEX",
    userId: "INDEX",
    uniqueParticipant: ["conversationId", "userId"], // Composite unique index
  },
};

// Messages table
const messages = {
  data: [
    {
      id: 1,
      conversationId: 1,
      senderId: 1,
      content: "Hey Jane, how are you?",
      type: "text", // text, image, file, etc.
      createdAt: "2024-10-21T10:25:00Z",
      updatedAt: "2024-10-21T10:25:00Z",
      status: "delivered", // sent, delivered, read
    },
    {
      id: 2,
      conversationId: 1,
      senderId: 2,
      content: "Hi John! I'm doing great, thanks for asking! How about you?",
      type: "text",
      createdAt: "2024-10-21T10:28:00Z",
      updatedAt: "2024-10-21T10:28:00Z",
      status: "read",
    },
    {
      id: 3,
      conversationId: 2,
      senderId: 3,
      content: "Did you see the latest project updates?",
      type: "text",
      createdAt: "2024-10-21T09:15:00Z",
      updatedAt: "2024-10-21T09:15:00Z",
      status: "delivered",
    },
    {
      id: 4,
      conversationId: 3,
      senderId: 1,
      content: "Team meeting tomorrow at 10 AM",
      type: "text",
      createdAt: "2024-10-21T10:00:00Z",
      updatedAt: "2024-10-21T10:00:00Z",
      status: "delivered",
    },
  ],
  indexes: {
    conversationId: "INDEX",
    senderId: "INDEX",
    createdAt: "INDEX",
  },
};

// Message reactions (for message reactions feature)
const messageReactions = {
  data: [
    {
      id: 1,
      messageId: 1,
      userId: 2,
      reaction: "👍",
      createdAt: "2024-10-21T10:26:00Z",
    },
    {
      id: 2,
      messageId: 4,
      userId: 2,
      reaction: "👍",
      createdAt: "2024-10-21T10:01:00Z",
    },
    {
      id: 3,
      messageId: 4,
      userId: 3,
      reaction: "👍",
      createdAt: "2024-10-21T10:02:00Z",
    },
  ],
  indexes: {
    messageId: "INDEX",
    userId: "INDEX",
    uniqueReaction: ["messageId", "userId"],
  },
};

const mockQueries = {
  // Get conversation with latest message and participants
  getConversationWithDetails: (conversationId: number) => {
    const conversation = conversations.data.find(
      (c) => c.id === conversationId
    );
    if (!conversation) return null;

    const participants = conversationParticipants.data
      .filter((p) => p.conversationId === conversationId)
      .map((p) => ({
        ...p,
        user: users.data.find((u) => u.id === p.userId),
      }));

    const conversationMessages = messages.data
      .filter((m) => m.conversationId === conversationId)
      .map((m) => ({
        ...m,
        sender: users.data.find((u) => u.id === m.senderId),
        reactions: messageReactions.data.filter((r) => r.messageId === m.id),
      }))
      .sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return {
      ...conversation,
      participants,
      messages: conversationMessages,
      lastMessage: conversationMessages[0],
    };
  },

  // Get all conversations for a user
  getUserConversations: (userId: number) => {
    const userConversationIds = conversationParticipants.data
      .filter((p) => p.userId === userId)
      .map((p) => p.conversationId);

    return userConversationIds
      .map((conversationId) =>
        mockQueries.getConversationWithDetails(conversationId)
      )
      .sort((a, b) => {
        const dateA = new Date(a?.lastMessage?.createdAt ?? 0).getTime();
        const dateB = new Date(b?.lastMessage?.createdAt ?? 0).getTime();
        return dateB - dateA;
      });
  },
};

export {
  users,
  conversations,
  conversationParticipants,
  messages,
  messageReactions,
  mockQueries,
};
