import { Message, UserData } from "@/app/data";
import useChatStore from "@/hooks/use-chat-store";
import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
