import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">

      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-semibold hidden lg:block text-lg">
            Contacts
          </span>
        </div>

        {/* Online Toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="toggle toggle-sm toggle-primary"
            />

            <span className="text-sm">Online only</span>
          </label>

          <span className="text-xs text-base-content/60">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2">

        {filteredUsers.map((user) => {

          // First Letter Avatar
          const firstLetter = user.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "U";

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-3 py-3 flex items-center gap-3
                hover:bg-base-200 transition-all duration-200
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-200 border-r-4 border-primary"
                    : ""
                }
              `}
            >

              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0">

                <div className="
                  size-12 rounded-full
                  bg-gradient-to-br from-primary to-secondary
                  flex items-center justify-center
                  text-primary-content font-bold text-lg
                  shadow-md
                ">
                  {firstLetter}
                </div>

                {/* Online Dot */}
                {onlineUsers.includes(user._id) && (
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
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate">
                  {user.fullName}
                </div>

                <div className="text-sm text-base-content/60">
                  {onlineUsers.includes(user._id)
                    ? "Online"
                    : "Offline"}
                </div>
              </div>

            </button>
          );
        })}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/60 py-10">
            No online users
          </div>
        )}

      </div>
    </aside>
  );
};

export default Sidebar;