import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationItem {
  prompt: string;
  response: string;
}

interface ChatConversationProps {
  conversation: ConversationItem[];
  children?: React.ReactNode;
  avatarUrl: string | null;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversation,
  children,
  avatarUrl,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="h-full overflow-auto py-6 px-2">
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
        {conversation.length === 0 ? (
          <div className="text-center text-gray-500 italic">
            
          </div>
        ) : (
          conversation.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="self-end bg-slate-500 text-white rounded-xl px-4 py-2 shadow-md max-w-md">
                {item.prompt}
              </div>
              {item.response && (
                <div className="flex items-start gap-3 self-start">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        avatarUrl ||
                        "https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif"
                      }
                      alt="AI"
                    />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className=" text-gray-800 rounded-xl py-2   max-w-md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.response}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        {/* Dummy element for auto-scrolling */}
        <div ref={messagesEndRef} />
        {children}
      </div>
    </div>
  );
};

export default ChatConversation;
