import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      // Clear input
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300 bg-base-100">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          className="w-full input input-bordered rounded-full px-4"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary btn-circle"
          disabled={!text.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;