
// import { NavLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Home,
//   Users,
//   MessageSquare,
//   HelpCircle,
//   Target,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";

// export function PageLayout({ children }) {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const navClass = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
//      ${
//        isActive
//          ? "bg-blue-600 text-white"
//          : "text-gray-600 hover:bg-gray-100"
//      }`;

//   async function handleLogout() {
//     try {
//       await logout();
//       navigate("/"); // or /login if you have one
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* ================= TOP NAVBAR ================= */}
//       <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <span className="text-xl font-bold text-blue-600">
//               SkillShare
//             </span>
//           </div>

//           {/* Navigation */}
//           <nav className="flex items-center gap-2">
//             <NavLink to="/dashboard" end className={navClass}>
//               <Home size={16} />
//               Dashboard
//             </NavLink>

//             <NavLink to="/dashboard/skillmatch" className={navClass}>
//               <Target size={16} />
//               Skill Match
//             </NavLink>

//             <NavLink to="/dashboard/helpdesk" className={navClass}>
//               <HelpCircle size={16} />
//               Helpdesk
//             </NavLink>

//             <NavLink to="/dashboard/connections" className={navClass}>
//               <Users size={16} />
//               Connections
//             </NavLink>

//             <NavLink to="/dashboard/chats" className={navClass}>
//               <MessageSquare size={16} />
//               Chats
//             </NavLink>

//             <NavLink to="/dashboard/profile" className={navClass}>
//               <User size={16} />
//               Profile
//             </NavLink>

//             <NavLink to="/dashboard/settings" className={navClass}>
//               <Settings size={16} />
//               Settings
//             </NavLink>
//           </nav>

//           {/* ================= USER / LOGOUT ================= */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           )}
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="flex-1">
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="max-w-7xl mx-auto p-6"
//         >
//           {children}
//         </motion.div>
//       </main>
//     </div>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  MessageSquare,
  HelpCircle,
  Target,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function PageLayout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ================= TOP NAVBAR ================= */}
      <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-blue-600">
              SkillShare
            </span>
          </div>

          {/* Navigation (hidden on small screens) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink to="/dashboard" end className={navClass}>
              <Home size={16} />
              <span className="hidden lg:inline">Dashboard</span>
            </NavLink>

            <NavLink to="/dashboard/skillmatch" className={navClass}>
              <Target size={16} />
              <span className="hidden lg:inline">Skill Match</span>
            </NavLink>

            <NavLink to="/dashboard/helpdesk" className={navClass}>
              <HelpCircle size={16} />
              <span className="hidden lg:inline">Helpdesk</span>
            </NavLink>

            <NavLink to="/dashboard/connections" className={navClass}>
              <Users size={16} />
              <span className="hidden lg:inline">Connections</span>
            </NavLink>

            <NavLink to="/dashboard/chats" className={navClass}>
              <MessageSquare size={16} />
              <span className="hidden lg:inline">Chats</span>
            </NavLink>

            <NavLink to="/dashboard/profile" className={navClass}>
              <User size={16} />
              <span className="hidden lg:inline">Profile</span>
            </NavLink>

            <NavLink to="/dashboard/settings" className={navClass}>
              <Settings size={16} />
              <span className="hidden lg:inline">Settings</span>
            </NavLink>
          </nav>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="
            max-w-7xl
            mx-auto
            px-4 sm:px-6
            py-4 sm:py-6
          "
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
