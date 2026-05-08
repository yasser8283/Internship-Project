import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Get first letter
  const firstLetter = selectedUser?.fullName
    ? selectedUser.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="relative">

            <div
              className="
                size-11 rounded-full
                bg-gradient-to-br from-primary to-secondary
                flex items-center justify-center
                text-primary-content font-bold text-lg
                shadow-md
              "
            >
              {firstLetter}
            </div>

            {/* Online Dot */}
            {onlineUsers.includes(selectedUser._id) && (
              <span
                className="
                  absolute bottom-0 right-0
                  size-3 bg-green-500 rounded-full
                  ring-2 ring-base-100
                "
              />
            )}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-base-content">
              {selectedUser.fullName}
            </h3>

            <p className="text-sm text-base-content/60">
              {onlineUsers.includes(selectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="
            btn btn-sm btn-circle btn-ghost
            hover:bg-base-200
          "
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
};

export default ChatHeader;