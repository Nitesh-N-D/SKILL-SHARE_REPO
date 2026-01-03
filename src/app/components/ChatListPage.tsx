import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";

/* ---------------- TYPES ---------------- */
interface ChatItem {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt?: any;
}

interface UserProfile {
  displayName: string;
  photoURL?: string;
}

export default function ChatListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH CHATS ---------- */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any)
      }));
      setChats(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  /* ---------- FETCH USER PROFILES ---------- */
  useEffect(() => {
    if (!user || chats.length === 0) return;

    chats.forEach(async (chat) => {
      const otherUserId = chat.participants.find(
        (p) => p !== user.uid
      );
      if (!otherUserId || profiles[otherUserId]) return;

      const snap = await getDoc(doc(db, "users", otherUserId));
      if (snap.exists()) {
        setProfiles((prev) => ({
          ...prev,
          [otherUserId]: snap.data() as UserProfile
        }));
      }
    });
  }, [chats, user]);

  if (!user) return null;

  return (
    <div className="h-screen w-80 border-r bg-white flex flex-col">

      {/* ---------- HEADER ---------- */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Chats</h2>
      </div>

      {/* ---------- CHAT LIST ---------- */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <p className="text-center mt-10 text-gray-500">
            Loading chats...
          </p>
        )}

        {!loading && chats.length === 0 && (
          <p className="text-center mt-10 text-gray-400">
            No conversations yet
          </p>
        )}

        {chats.map((chat) => {
          const otherUserId =
            chat.participants.find((p) => p !== user.uid)!;

          const profile = profiles[otherUserId];

          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
            >
              {/* ---------- AVATAR ---------- */}
              {profile?.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {profile?.displayName?.charAt(0) || "U"}
                </div>
              )}

              {/* ---------- TEXT ---------- */}
              <div className="flex-1">
                <p className="font-medium text-sm truncate">
                  {profile?.displayName || "Loading..."}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage || "Start chatting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
