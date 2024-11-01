import { useQuery } from "@tanstack/react-query";
import { MessageInterface, UserInterface } from "./Interface";

const API_URL = import.meta.env.VITE_APP_API_URL;

const userApi = {
  getList: async (): Promise<UserInterface[]> => {
    const response = await fetch(`${API_URL}/api/user/list`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },
};

export const useUserList = () => {
  return useQuery<UserInterface[], Error>({
    queryKey: ["UserList"],
    queryFn: userApi.getList,
  });
};

// messages
const messageApi = {
  getMessages: async (
    conversationId: number | null
  ): Promise<MessageInterface[]> => {
    const url = conversationId
      ? `${API_URL}/api/message?conversationId=${conversationId}`
      : `${API_URL}/api/message`;

    const response = await fetch(url);
    return response.json();
  },
};

export const useMessages = (conversationId: number | null) => {
  return useQuery<MessageInterface[], Error>({
    queryKey: ["GetMessages"],
    queryFn: () => messageApi.getMessages(conversationId),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
};
