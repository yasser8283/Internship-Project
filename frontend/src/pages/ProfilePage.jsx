import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  // Get first letter of username
  const firstLetter = authUser?.fullName
    ? authUser.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen pt-20 px-4 bg-base-200">
      <div className="max-w-3xl mx-auto">

        {/* Main Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-8">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content shadow-lg border-4 border-base-100">
              <span className="text-5xl font-bold">
                {firstLetter}
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              {authUser?.fullName || "User"}
            </h1>

            <p className="text-sm text-base-content/70">
              Manage your profile information
            </p>
          </div>

          {/* Info Section */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Full Name */}
            <div className="bg-base-200 rounded-xl p-4 border border-base-300 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </div>

              <p className="font-medium text-base-content">
                {authUser?.fullName || "-"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-base-200 rounded-xl p-4 border border-base-300 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
                <Mail className="w-4 h-4" />
                Email
              </div>

              <p className="font-medium text-base-content break-all">
                {authUser?.email || "-"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-8">Account Info</div>

          {/* Account Info */}
          <div className="space-y-4">

            {/* Member Since */}
            <div className="flex items-center justify-between bg-base-200 p-4 rounded-xl border border-base-300">
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <Calendar className="w-4 h-4" />
                Member Since
              </div>

              <span className="font-medium">
                {authUser?.createdAt?.split("T")[0] || "-"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between bg-base-200 p-4 rounded-xl border border-base-300">
              <span className="text-sm text-base-content/70">
                Account Status
              </span>

              <span className="badge badge-success badge-outline">
                Active
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;