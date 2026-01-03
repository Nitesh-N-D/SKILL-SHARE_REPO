import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

export function ChatPage() {
  const { chatId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "chat", chatId!, "messages"),
      orderBy("createdAt")
    );

    return onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => d.data()));
    });
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chat", chatId!, "messages"), {
      senderId: user!.uid,
      text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              m.senderId === user?.uid
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded-lg p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
