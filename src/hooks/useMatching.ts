// // import { useState, useCallback } from "react";
// // import { getMatchedPeers } from "../firebase/matchingService";

// // /* ---------------- TYPES ---------------- */

// // export interface MatchedPeer {
// //   id: string;
// //   name: string;
// //   avatar?: string;
// //   interests?: string[];
// //   matchScore?: number;
// // }

// // /* ---------------- HOOK ---------------- */

// // export function useMatching() {
// //   const [matches, setMatches] = useState<MatchedPeer[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);

// //   /**
// //    * Find matching peers for a given user
// //    * @param userId - Current user ID
// //    * @param limit - Max number of matches
// //    */
// //   const findMatches = useCallback(
// //     async (userId: string, limit: number = 10): Promise<MatchedPeer[]> => {
// //       if (!userId) {
// //         const msg = "User ID is required to find matches";
// //         setError(msg);
// //         throw new Error(msg);
// //       }

// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const result = await getMatchedPeers(userId, limit);

// //         if (!Array.isArray(result)) {
// //           throw new Error("Invalid match data received");
// //         }

// //         setMatches(result);
// //         return result;
// //       } catch (err: unknown) {
// //         const message =
// //           err instanceof Error ? err.message : "Failed to fetch matches";
// //         setError(message);
// //         throw err;
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     []
// //   );

// //   /** Clear current matches and errors */
// //   const clearMatches = useCallback(() => {
// //     setMatches([]);
// //     setError(null);
// //   }, []);

// //   return {
// //     matches,
// //     loading,
// //     error,
// //     findMatches,
// //     clearMatches,
// //   };
// // }
// import { useState, useCallback } from "react";
// import { getMatchedPeers } from "../firebase/matchingService";

// /* ---------------- TYPES ---------------- */

// export interface MatchedPeer {
//   [x: string]: string;
//   id: string;
//   name: string;
//   avatar?: string;
//   interests?: string[];
//   matchScore: number;
// }

// /* ---------------- HOOK ---------------- */

// export function useMatching() {
//   const [matches, setMatches] = useState<MatchedPeer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const findMatches = useCallback(
//     async (userId: string, limit = 10): Promise<MatchedPeer[]> => {
//       if (!userId) throw new Error("User ID missing");

//       try {
//         setLoading(true);
//         setError(null);

//         const result = await getMatchedPeers(userId, limit);

//         // ✅ SORT BY MATCH SCORE
//         const ordered = [...result].sort(
//         (a, b) => b.matchScore - a.matchScore
//         );


//         setMatches(ordered);
//         return ordered;
//       } catch (err) {
//         setError("Failed to load matches");
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   return { matches, loading, error, findMatches };
// }
import { useState, useCallback } from "react";
import { getMatchedPeers } from "../firebase/matchingService";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/* ---------------- TYPES ---------------- */

export interface MatchedPeer {
  id: string;
  name: string;
  avatar?: string;
  interests?: string[];
  matchScore: number;
  connectionStatus: "none" | "pending" | "accepted";
}

/* ---------------- HOOK ---------------- */

export function useMatching() {
  const [matches, setMatches] = useState<MatchedPeer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findMatches = useCallback(
    async (userId: string, limit = 10): Promise<MatchedPeer[]> => {
      if (!userId) throw new Error("User ID missing");

      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Get base matches
        const peers = await getMatchedPeers(userId, limit);

        // 2️⃣ Load ALL connection requests involving me
        const outgoingSnap = await getDocs(
          query(
            collection(db, "skillRequests"),
            where("fromUserId", "==", userId)
          )
        );

        const incomingSnap = await getDocs(
          query(
            collection(db, "skillRequests"),
            where("toUserId", "==", userId)
          )
        );

        const requests = [
          ...outgoingSnap.docs,
          ...incomingSnap.docs,
        ].map(d => d.data());

        // 3️⃣ Attach connectionStatus
        const enriched: MatchedPeer[] = peers.map(peer => {
          const req = requests.find(
            r =>
              (r.fromUserId === userId && r.toUserId === peer.id) ||
              (r.fromUserId === peer.id && r.toUserId === userId)
          );

          return {
            ...peer,
            connectionStatus: req?.status ?? "none",
          };
        });

        // 4️⃣ Sort by match score (keep your logic)
        enriched.sort((a, b) => b.matchScore - a.matchScore);

        setMatches(enriched);
        return enriched;
      } catch (err) {
        setError("Failed to load matches");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { matches, loading, error, findMatches };
}
