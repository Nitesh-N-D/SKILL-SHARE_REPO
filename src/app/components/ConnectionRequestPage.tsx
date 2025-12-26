import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firestore";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function ConnectionRequestPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>(null);
  const [sender, setSender] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!requestId) return;

      const reqSnap = await getDoc(doc(db, "skillRequests", requestId));
      if (!reqSnap.exists()) return;

      setRequest(reqSnap.data());

      const userSnap = await getDoc(
        doc(db, "users", reqSnap.data().fromUserId)
      );
      setSender(userSnap.data());
    }

    load();
  }, [requestId]);

  const updateStatus = async (status: "accepted" | "rejected") => {
    if (!requestId) return;

    await updateDoc(doc(db, "skillRequests", requestId), {
      status,
    });

    toast.success(`Request ${status}`);
    navigate("/dashboard");
  };

  if (!request || !sender) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Connection Request
      </h2>

      <p className="font-medium">{sender.displayName}</p>
      <p className="text-sm text-gray-600 mb-4">
        Interests: {sender.interests?.join(", ")}
      </p>

      <div className="flex gap-4">
        <Button onClick={() => updateStatus("accepted")}>
          Accept
        </Button>
        <Button
          variant="outline"
          onClick={() => updateStatus("rejected")}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
