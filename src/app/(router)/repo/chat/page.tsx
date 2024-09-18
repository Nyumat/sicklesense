import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

export default function Chat() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="flex h-full w-full">
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    </div>
  );
}
