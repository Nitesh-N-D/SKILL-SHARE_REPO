// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Bell } from "lucide-react";
// import { createPortal } from "react-dom";

// // Local fallback hook for notifications (avoids relying on path aliases)
// type Notification = {
//   id: string;
//   title: string;
//   message: string;
//   type: "connection" | "answer" | "other";
//   read?: boolean;
// };

// function useNotifications() {
//   const [notifications, setNotifications] = useState<Notification[]>([
//     {
//       id: "1",
//       title: "Welcome to the dashboard",
//       message: "This is a sample notification.",
//       type: "other",
//       read: false,
//     },
//     {
//       id: "2",
//       title: "New connection request",
//       message: "You have a new connection request.",
//       type: "connection",
//       read: false,
//     },
//     {
//       id: "3",
//       title: "Answer received",
//       message: "Someone answered your question.",
//       type: "answer",
//       read: true,
//     },
//   ]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   function markAllRead() {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   }

//   return { notifications, unreadCount, markAllRead };
// }

// /* ---------------- COMPONENT ---------------- */

// export function NotificationBell() {
//   const {
//     notifications,
//     unreadCount,
//     markAllRead,
//   } = useNotifications();

//   const [open, setOpen] = useState(false);
//   const [tab, setTab] = useState<"all" | "connection" | "answer">("all");

//   /* ---------------- ESC CLOSE ---------------- */

//   useEffect(() => {
//     function handleEsc(e: KeyboardEvent) {
//       if (e.key === "Escape") setOpen(false);
//     }
//     if (open) document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [open]);

//   /* ---------------- FILTER ---------------- */

//   const filteredNotifications =
//     tab === "all"
//       ? notifications
//       : notifications.filter((n) => n.type === tab);

//   /* ---------------- RENDER ---------------- */

//   return (
//     <>
//       {/* 🔔 Bell */}
//       <motion.button
//         whileHover={{ y: -1 }}
//         whileTap={{ scale: 0.92 }}
//         onClick={() => setOpen(true)}
//         className="
//           relative p-2 rounded-full
//           bg-white border border-gray-300
//           hover:bg-gray-100 hover:shadow-md
//           transition-all duration-200
//         "
//       >
//         <Bell className="w-6 h-6 text-gray-800" />
//         {unreadCount > 0 && (
//           <span
//             className="
//               absolute -top-1 -right-1
//               bg-gray-900 text-white
//               text-xs w-5 h-5 rounded-full
//               flex items-center justify-center
//             "
//           >
//             {unreadCount}
//           </span>
//         )}
//       </motion.button>

//       {createPortal(
//         <AnimatePresence>
//           {open && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="
//                 fixed inset-0 z-[999]
//                 flex items-center justify-center
//                 bg-black/40 backdrop-blur-sm
//               "
//               onClick={() => setOpen(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.96, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.96, opacity: 0 }}
//                 transition={{ duration: 0.2, ease: "easeOut" }}
//                 onClick={(e) => e.stopPropagation()}
//                 className="
//                   w-[95%] max-w-lg
//                   bg-white rounded-xl
//                   border border-gray-300
//                   shadow-2xl overflow-hidden
//                 "
//               >
//                 {/* HEADER */}
//                 <div className="px-6 py-4 border-b flex justify-between">
//                   <h3 className="text-lg font-semibold">Notifications</h3>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={markAllRead}
//                       className="text-sm text-gray-600 hover:text-gray-900 underline"
//                     >
//                       Mark all as read
//                     </button>

//                     <motion.button
//                       whileHover={{ rotate: 90 }}
//                       onClick={() => setOpen(false)}
//                       className="
//                         w-9 h-9 flex items-center justify-center
//                         rounded-lg border
//                         hover:bg-gray-100
//                       "
//                     >
//                       ×
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* TABS */}
//                 <div className="flex gap-2 px-6 py-3 border-b">
//                   {[
//                     { id: "all", label: "All" },
//                     { id: "connection", label: "Requests" },
//                     { id: "answer", label: "Answers" },
//                   ].map((t) => (
//                     <button
//                       key={t.id}
//                       onClick={() => setTab(t.id as any)}
//                       className={`px-4 py-1.5 rounded-md ${
//                         tab === t.id
//                           ? "bg-gray-900 text-white"
//                           : "bg-gray-100 hover:bg-gray-200"
//                       }`}
//                     >
//                       {t.label}
//                     </button>
//                   ))}
//                 </div>

//                 {/* BODY */}
//                 <div className="max-h-[65vh] overflow-y-auto divide-y">
//                   {filteredNotifications.length === 0 ? (
//                     <div className="p-10 text-center text-gray-500 text-sm">
//                       No notifications
//                     </div>
//                   ) : (
//                     filteredNotifications.map((n) => (
//                       <div
//                         key={n.id}
//                         className={`px-6 py-4 ${
//                           !n.read ? "bg-gray-100" : ""
//                         }`}
//                       >
//                         <p className="font-medium">{n.title}</p>
//                         <p className="text-sm text-gray-600">{n.message}</p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>,
//         document.body
//       )}
//     </>
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
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export function PageLayout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  function go(path: string) {
    setOpen(false);
    navigate(path);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            SkillShare
          </span>

          {/* ================= DESKTOP NAV (UNCHANGED) ================= */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" end className={navClass}>
              <Home size={16} /> Dashboard
            </NavLink>

            <NavLink to="/dashboard/skillmatch" className={navClass}>
              <Target size={16} /> Skill Match
            </NavLink>

            <NavLink to="/dashboard/helpdesk" className={navClass}>
              <HelpCircle size={16} /> Helpdesk
            </NavLink>

            <NavLink to="/dashboard/connections" className={navClass}>
              <Users size={16} /> Connections
            </NavLink>

            <NavLink to="/dashboard/chats" className={navClass}>
              <MessageSquare size={16} /> Chats
            </NavLink>

            <NavLink to="/dashboard/profile" className={navClass}>
              <User size={16} /> Profile
            </NavLink>

            <NavLink to="/dashboard/settings" className={navClass}>
              <Settings size={16} /> Settings
            </NavLink>
          </nav>

          {/* ================= DESKTOP LOGOUT ================= */}
          {user && (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md"
            >
              <LogOut size={16} /> Logout
            </button>
          )}

          {/* ================= MOBILE HAMBURGER ================= */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-blue-600">
                SkillShare
              </span>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              <button onClick={() => go("/dashboard")} className={navClass({ isActive: false })}>
                <Home size={16} /> Dashboard
              </button>

              <button onClick={() => go("/dashboard/skillmatch")} className={navClass({ isActive: false })}>
                <Target size={16} /> Skill Match
              </button>

              <button onClick={() => go("/dashboard/helpdesk")} className={navClass({ isActive: false })}>
                <HelpCircle size={16} /> Helpdesk
              </button>

              <button onClick={() => go("/dashboard/connections")} className={navClass({ isActive: false })}>
                <Users size={16} /> Connections
              </button>

              <button onClick={() => go("/dashboard/chats")} className={navClass({ isActive: false })}>
                <MessageSquare size={16} /> Chats
              </button>

              <button onClick={() => go("/dashboard/profile")} className={navClass({ isActive: false })}>
                <User size={16} /> Profile
              </button>

              <button onClick={() => go("/dashboard/settings")} className={navClass({ isActive: false })}>
                <Settings size={16} /> Settings
              </button>
            </nav>

            {user && (
              <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-md"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
