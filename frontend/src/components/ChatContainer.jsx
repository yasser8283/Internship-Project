import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-200">

      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {messages.map((message) => {

          const isOwnMessage =
            message.senderId === authUser._id;

          // Avatar Letter
          const firstLetter = isOwnMessage
            ? authUser?.fullName?.charAt(0).toUpperCase()
            : selectedUser?.fullName?.charAt(0).toUpperCase();

          return (
            <div
              key={message._id}
              className={`chat ${
                isOwnMessage
                  ? "chat-end"
                  : "chat-start"
              }`}
              ref={messageEndRef}
            >

              {/* Avatar */}
              <div className="chat-image avatar">

                <div
                  className="
                    size-10 rounded-full
                    bg-gradient-to-br from-primary to-secondary
                    flex items-center justify-center
                    text-primary-content font-bold
                    shadow-md
                  "
                >
                  {firstLetter || "U"}
                </div>
              </div>

              {/* Header */}
              <div className="chat-header mb-1">
                <time className="text-xs text-base-content/50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Message Bubble */}
              <div
                className={`
                  chat-bubble px-4 py-3 shadow-sm
                  ${
                    isOwnMessage
                      ? "bg-primary text-primary-content"
                      : "bg-base-100 text-base-content"
                  }
                `}
              >
                {message.text && (
                  <p className="leading-relaxed">
                    {message.text}
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;