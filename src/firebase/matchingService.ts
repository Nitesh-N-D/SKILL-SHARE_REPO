// // import {
// //   collection,
// //    etDocs,
// //   doc,
// //   getDoc,
// //   query,
// //   where,
// // } from "firebase/firestore";
// // import { db } from "../fireconnection";

// // /* =====================================================
// //    TYPES
// // ===================================================== */

// // export type SkillLevel =
// //   | "Beginner"
// //   | "Intermediate"
// //   | "Advanced"
// //   | "Expert";

// // export interface UserProfile {
// //   name?: string;
// //   interests?: string[];
// //   skillLevel?: SkillLevel;
// // }

// // export interface UserActivityStats {
// //   questionsAsked: number;
// //   answersGiven: number;
// // }

// // export interface MatchedPeer {
// //   id: string;
// //   name: string;
// //   interests: string[];
// //   skillLevel: SkillLevel;
// //   matchScore: number;
// //   stats: UserActivityStats;
// // }

// // /* =====================================================
// //    MATCH SCORE CALCULATION (0–100)
// // ===================================================== */

// // function calculateMatchScore(
// //   currentProfile: UserProfile,
// //   otherProfile: UserProfile,
// //   stats: UserActivityStats
// // ): number {
// //   let score = 0;

// //   /* ---------- 1. Shared Interests (40) ---------- */
// //   const currentInterests = currentProfile.interests ?? [];
// //   const otherInterests = otherProfile.interests ?? [];

// //   const sharedCount = currentInterests.filter((i) =>
// //     otherInterests.includes(i)
// //   ).length;

// //   const interestScore =
// //     currentInterests.length === 0
// //       ? 0
// //       : (sharedCount / currentInterests.length) * 40;

// //   score += interestScore;

// //   /* ---------- 2. Skill Level Similarity (30) ---------- */
// //   const levels: SkillLevel[] = [
// //     "Beginner",
// //     "Intermediate",
// //     "Advanced",
// //     "Expert",
// //   ];

// //   const currentIndex = levels.indexOf(
// //     currentProfile.skillLevel ?? "Intermediate"
// //   );
// //   const otherIndex = levels.indexOf(
// //     otherProfile.skillLevel ?? "Intermediate"
// //   );

// //   const diff = Math.abs(currentIndex - otherIndex);
// //   score += Math.max(0, 30 - diff * 10);

// //   /* ---------- 3. Activity Level (20) ---------- */
// //   const activity =
// //     (stats.questionsAsked ?? 0) + (stats.answersGiven ?? 0);

// //   score += Math.min(20, activity * 2);

// //   /* ---------- 4. Complementary Skills (10) ---------- */
// //   const complementaryCount = otherInterests.filter(
// //     (i) => !currentInterests.includes(i)
// //   ).length;

// //   score += Math.min(10, complementaryCount * 2);

// //   return Math.round(score);
// // }

// // /* =====================================================
// //    GET USER ACTIVITY STATS
// // ===================================================== */

// // async function getUserActivityStats(
// //   userId: string
// // ): Promise<UserActivityStats> {
// //   try {
// //     const questionsSnap = await getDocs(
// //       query(
// //         collection(db, "questions"),
// //         where("userId", "==", userId)
// //       )
// //     );

// //     const answersSnap = await getDocs(
// //       query(
// //         collection(db, "answers"),
// //         where("userId", "==", userId)
// //       )
// //     );

// //     return {
// //       questionsAsked: questionsSnap.size,
// //       answersGiven: answersSnap.size,
// //     };
// //   } catch (err) {
// //     console.error("❌ Stats error:", err);
// //     return { questionsAsked: 0, answersGiven: 0 };
// //   }
// // }

// // /* =====================================================
// //    MAIN MATCHING FUNCTION
// // ===================================================== */

// // export async function getMatchedPeers(
// //   currentUserId: string,
// //   limit: number = 10
// // ): Promise<MatchedPeer[]> {
// //   try {
// //     /* ---------- Current User ---------- */
// //     const currentSnap = await getDoc(
// //       doc(db, "users", currentUserId)
// //     );

// //     if (!currentSnap.exists()) {
// //       throw new Error("Current user not found");
// //     }

// //     const currentProfile =
// //       currentSnap.data() as UserProfile;

// //     /* ---------- All Users ---------- */
// //     const usersSnap = await getDocs(
// //       collection(db, "users")
// //     );

// //     const matches: MatchedPeer[] = [];

// //     for (const userDoc of usersSnap.docs) {
// //       if (userDoc.id === currentUserId) continue;

// //       const otherProfile =
// //         userDoc.data() as UserProfile;

// //       const stats = await getUserActivityStats(userDoc.id);

// //       const score = calculateMatchScore(
// //         currentProfile,
// //         otherProfile,
// //         stats
// //       );

// //       matches.push({
// //         id: userDoc.id,
// //         name: otherProfile.name ?? "Unknown",
// //         interests: otherProfile.interests ?? [],
// //         skillLevel:
// //           otherProfile.skillLevel ?? "Intermediate",
// //         matchScore: score,
// //         stats,
// //       });
// //     }

// //     return matches
// //       .sort((a, b) => b.matchScore - a.matchScore)
// //       .slice(0, limit);
// //   } catch (err) {
// //     console.error("❌ Matching failed:", err);
// //     throw err;
// //   }
// // }
// // import {
// //   collection,
// //   getDocs,
// //   doc,
// //   getDoc,
// //   query,
// //   where,
// // } from "firebase/firestore";
// // import { db } from "../lib/firebase";

// // /* =====================================================
// //    TYPES (MATCH YOUR APP)
// // ===================================================== */

// // export type SkillLevel =
// //   | "beginner"
// //   | "intermediate"
// //   | "advanced";

// // export interface UserProfile {
// //   displayName?: string;
// //   interests?: string[];
// //   skillLevel?: SkillLevel;
// // }

// // export interface UserActivityStats {
// //   questionsAsked: number;
// //   answersGiven: number;
// // }

// // export interface MatchedPeer {
// //   id: string;
// //   name: string;
// //   interests: string[];
// //   skillLevel: SkillLevel;
// //   matchScore: number;
// //   stats: UserActivityStats;
// // }

// // /* =====================================================
// //    MATCH SCORE CALCULATION (0–100)
// // ===================================================== */
// // function normalizeInterest(value: string): string {
// //   return value.trim().toLowerCase();
// // }


// // function calculateMatchScore(
// //   currentProfile: UserProfile,
// //   otherProfile: UserProfile,
// //   stats: UserActivityStats
// // ): number {
// //   let score = 0;

// //   const currentInterests = currentProfile.interests ?? [];
// //   const otherInterests = otherProfile.interests ?? [];

// //   /* =====================================================
// //      1️⃣ SAME FIELD CHECK (MANDATORY)
// //      -----------------------------------------------------
// //      No shared interest = NO MATCH
// //   ===================================================== */
// //   const sharedInterests = currentInterests.filter((i) =>
// //     otherInterests.includes(i)
// //   );

// //   if (sharedInterests.length === 0) {
// //     return 0; // ❌ completely irrelevant
// //   }

// //   /* =====================================================
// //      2️⃣ FIELD MATCH SCORE (40)
// //      -----------------------------------------------------
// //      More shared interests = better
// //   ===================================================== */
// //   score += Math.min(40, sharedInterests.length * 20);

// //   /* =====================================================
// //      3️⃣ SKILL LEVEL COMPATIBILITY (40)
// //      -----------------------------------------------------
// //      Core logic: peer vs mentor pairing
// //   ===================================================== */
// //   const levelIndex: Record<SkillLevel, number> = {
// //     beginner: 0,
// //     intermediate: 1,
// //     advanced: 2,
// //   };

// //   const currentLevel =
// //     levelIndex[currentProfile.skillLevel ?? "intermediate"];
// //   const otherLevel =
// //     levelIndex[otherProfile.skillLevel ?? "intermediate"];

// //   const diff = Math.abs(currentLevel - otherLevel);

// //   if (diff === 0) {
// //     score += 40; // perfect peer match
// //   } else if (diff === 1) {
// //     score += 28; // mentor / learner
// //   } else {
// //     score += 12; // far but still same field
// //   }

// //   /* =====================================================
// //      4️⃣ ACTIVITY LEVEL (15)
// //      -----------------------------------------------------
// //      Active learners preferred
// //   ===================================================== */
// //   const activity =
// //     (stats.questionsAsked ?? 0) +
// //     (stats.answersGiven ?? 0);

// //   score += Math.min(15, activity * 3);

// //   /* =====================================================
// //      5️⃣ COMPLEMENTARY INTERESTS (5)
// //      -----------------------------------------------------
// //      Small diversity bonus
// //   ===================================================== */
// //   const complementaryCount = otherInterests.filter(
// //     (i) => !currentInterests.includes(i)
// //   ).length;

// //   score += Math.min(5, complementaryCount);

// //   return Math.round(score);
// // }

// // /* =====================================================
// //    USER ACTIVITY STATS
// // ===================================================== */

// // async function getUserActivityStats(
// //   userId: string
// // ): Promise<UserActivityStats> {
// //   try {
// //     const [questionsSnap, answersSnap] = await Promise.all([
// //       getDocs(
// //         query(
// //           collection(db, "questions"),
// //           where("userId", "==", userId)
// //         )
// //       ),
// //       getDocs(
// //         query(
// //           collection(db, "answers"),
// //           where("userId", "==", userId)
// //         )
// //       ),
// //     ]);

// //     return {
// //       questionsAsked: questionsSnap.size,
// //       answersGiven: answersSnap.size,
// //     };
// //   } catch (err) {
// //     console.error("Stats error:", err);
// //     return { questionsAsked: 0, answersGiven: 0 };
// //   }
// // }

// // /* =====================================================
// //    MAIN MATCHING FUNCTION
// // ===================================================== */

// // export async function getMatchedPeers(
// //   currentUserId: string,
// //   limit = 10
// // ): Promise<MatchedPeer[]> {

// //   const currentSnap = await getDoc(doc(db, "users", currentUserId));
// //   if (!currentSnap.exists()) return [];

// //   const currentProfile = currentSnap.data() as UserProfile;

// //   const usersSnap = await getDocs(collection(db, "users"));

// //   const matches: MatchedPeer[] = [];

// //   for (const userDoc of usersSnap.docs) {
// //     if (userDoc.id === currentUserId) continue;

// //     const otherProfile = userDoc.data() as UserProfile;

// //     const score = calculateMatchScore(
// //       currentProfile,
// //       otherProfile,
// //       { questionsAsked: 0, answersGiven: 0 }
// //     );

// //     matches.push({
// //       id: userDoc.id,
// //       name: otherProfile.displayName ?? "Student",
// //       interests: otherProfile.interests ?? [],
// //       skillLevel: otherProfile.skillLevel ?? "intermediate",
// //       matchScore: score,
// //       stats: { questionsAsked: 0, answersGiven: 0 },
// //     });
// //   }

// //   return matches
// //     .sort((a, b) => b.matchScore - a.matchScore)
// //     .slice(0, limit);
// // }
// // import {
// //   collection,
// //   getDocs,
// //   doc,
// //   getDoc,
// // } from "firebase/firestore";
// // import { db } from "../lib/firebase";

// // /* =====================================================
// //    TYPES (MATCH YOUR APP)
// // ===================================================== */

// // export type SkillLevel =
// //   | "beginner"
// //   | "intermediate"
// //   | "advanced";

// // export interface UserProfile {
// //   displayName?: string;
// //   interests?: string[];
// //   skillLevel?: SkillLevel;
// // }

// // export interface UserActivityStats {
// //   questionsAsked: number;
// //   answersGiven: number;
// // }

// // export interface MatchedPeer {
// //   id: string;
// //   name: string;
// //   interests: string[];
// //   skillLevel: SkillLevel;
// //   matchScore: number;
// //   stats: UserActivityStats;
// // }

// // /* =====================================================
// //    HELPERS
// // ===================================================== */

// // function normalizeInterest(value: unknown): string | null {
// //   if (!value) return null;

// //   // Case 1: already string
// //   if (typeof value === "string") {
// //     return value.trim().toLowerCase();
// //   }

// //   // Case 2: object like { id, label }
// //   if (typeof value === "object" && "id" in value) {
// //     return String((value as any).id).trim().toLowerCase();
// //   }

// //   return null;
// // }


// // /* =====================================================
// //    MATCH SCORE CALCULATION (0–100)
// // ===================================================== */

// // function calculateMatchScore(
// //   currentProfile: UserProfile,
// //   otherProfile: UserProfile,
// //   stats: UserActivityStats
// // ): number {
// //   let score = 0;

// //   // 🔥 Normalize EVERYTHING safely
// //   const currentInterests = (currentProfile.interests ?? [])
// //     .map(normalizeInterest)
// //     .filter(Boolean) as string[];

// //   const otherInterests = (otherProfile.interests ?? [])
// //     .map(normalizeInterest)
// //     .filter(Boolean) as string[];

// //   console.log("CURRENT:", currentInterests);
// //   console.log("OTHER:", otherInterests);

// //   // ❌ No shared interest = no match
// //   const sharedInterests = currentInterests.filter(i =>
// //     otherInterests.includes(i)
// //   );

// //   if (sharedInterests.length === 0) return 0;

// //   /* ---------- INTEREST SCORE (40) ---------- */
// //   score += Math.min(40, sharedInterests.length * 20);

// //   /* ---------- SKILL LEVEL SCORE (40) ---------- */
// //   const levelIndex: Record<SkillLevel, number> = {
// //     beginner: 0,
// //     intermediate: 1,
// //     advanced: 2,
// //   };

// //   const currentLevel = levelIndex[currentProfile.skillLevel ?? "intermediate"];
// //   const otherLevel = levelIndex[otherProfile.skillLevel ?? "intermediate"];
// //   const diff = Math.abs(currentLevel - otherLevel);

// //   if (diff === 0) score += 40;
// //   else if (diff === 1) score += 28;
// //   else score += 12;

// //   /* ---------- ACTIVITY BONUS (15) ---------- */
// //   const activity = (stats.questionsAsked ?? 0) + (stats.answersGiven ?? 0);
// //   score += Math.min(15, activity * 3);

// //   /* ---------- COMPLEMENTARY BONUS (5) ---------- */
// //   const complementary = otherInterests.filter(
// //     i => !currentInterests.includes(i)
// //   ).length;

// //   score += Math.min(5, complementary);

// //   return Math.min(100, Math.round(score));
// // }


// // /* =====================================================
// //    MAIN MATCHING FUNCTION
// // ===================================================== */

// // export async function getMatchedPeers(
// //   currentUserId: string,
// //   limit = 10
// // ): Promise<MatchedPeer[]> {
// //   const currentSnap = await getDoc(doc(db, "users", currentUserId));
// //   if (!currentSnap.exists()) return [];

// //   const currentProfile = currentSnap.data() as UserProfile;

// //   const usersSnap = await getDocs(collection(db, "users"));
// //   const matches: MatchedPeer[] = [];

// //   for (const userDoc of usersSnap.docs) {
// //     if (userDoc.id === currentUserId) continue;

// //     const otherProfile = userDoc.data() as UserProfile;

// //     const score = calculateMatchScore(
// //       currentProfile,
// //       otherProfile,
// //       { questionsAsked: 0, answersGiven: 0 } // ✅ SAFE DEFAULT
// //     );

// //     matches.push({
// //       id: userDoc.id,
// //       name: otherProfile.displayName ?? "Student",
// //       interests: otherProfile.interests ?? [],
// //       skillLevel: otherProfile.skillLevel ?? "intermediate",
// //       matchScore: score,
// //       stats: { questionsAsked: 0, answersGiven: 0 },
// //     });
// //   }

// //   return matches
// //     .sort((a, b) => b.matchScore - a.matchScore)
// //     .slice(0, limit);
// // }
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../lib/firebase";

// /* =====================================================
//    TYPES
// ===================================================== */

// export type SkillLevel = "beginner" | "intermediate" | "advanced";

// export interface UserProfile {
//   displayName?: string;
//   interests?: any[];       // 👈 allow dirty data
//   skillLevel?: SkillLevel;
// }

// export interface UserActivityStats {
//   questionsAsked: number;
//   answersGiven: number;
// }

// export interface MatchedPeer {
//   id: string;
//   name: string;
//   interests: string[];
//   skillLevel: SkillLevel;
//   matchScore: number;
//   stats: UserActivityStats;
// }

// /* =====================================================
//    NORMALIZATION (CRITICAL)
// ===================================================== */

// function normalizeInterest(value: any): string | null {
//   if (!value) return null;

//   if (typeof value === "string") {
//     return value.trim().toLowerCase();
//   }

//   if (typeof value === "object" && value.id) {
//     return String(value.id).trim().toLowerCase();
//   }

//   return null;
// }

// function normalizeSkillLevel(level?: string): SkillLevel {
//   if (!level) return "intermediate";

//   const l = level.toLowerCase();
//   if (l === "beginner") return "beginner";
//   if (l === "advanced") return "advanced";

//   return "intermediate";
// }

// /* =====================================================
//    MATCH SCORE
// ===================================================== */

// function calculateMatchScore(
//   currentProfile: UserProfile,
//   otherProfile: UserProfile
// ): number {
//   let score = 0;

//   const currentInterests = (currentProfile.interests ?? [])
//     .map(normalizeInterest)
//     .filter(Boolean) as string[];

//   const otherInterests = (otherProfile.interests ?? [])
//     .map(normalizeInterest)
//     .filter(Boolean) as string[];

//   // ❌ HARD EXIT — no shared interest
//   const shared = currentInterests.filter(i =>
//     otherInterests.includes(i)
//   );

//   if (shared.length === 0) return 0;

//   // 1️⃣ Interests (40)
//   score += Math.min(40, shared.length * 20);

//   // 2️⃣ Skill level (40)
//   const levelMap = { beginner: 0, intermediate: 1, advanced: 2 };

//   const cLevel = levelMap[normalizeSkillLevel(currentProfile.skillLevel)];
//   const oLevel = levelMap[normalizeSkillLevel(otherProfile.skillLevel)];

//   const diff = Math.abs(cLevel - oLevel);
//   score += diff === 0 ? 40 : diff === 1 ? 28 : 12;

//   // 3️⃣ Complementary (20)
//   const complement = otherInterests.filter(
//     i => !currentInterests.includes(i)
//   ).length;

//   score += Math.min(20, complement * 5);

//   return Math.min(100, score);
// }

// /* =====================================================
//    MAIN FUNCTION
// ===================================================== */

// export async function getMatchedPeers(
//   currentUserId: string,
//   limit = 10
// ): Promise<MatchedPeer[]> {

//   const currentSnap = await getDoc(doc(db, "users", currentUserId));
//   if (!currentSnap.exists()) return [];

//   const currentProfile = currentSnap.data() as UserProfile;

//   const usersSnap = await getDocs(collection(db, "users"));
//   const matches: MatchedPeer[] = [];

//   for (const userDoc of usersSnap.docs) {
//     if (userDoc.id === currentUserId) continue;

//     const otherProfile = userDoc.data() as UserProfile;
//     const score = calculateMatchScore(currentProfile, otherProfile);

//     if (score === 0) continue; // 🔥 REMOVE NO-MATCH USERS

//     matches.push({
//       id: userDoc.id,
//       name: otherProfile.displayName ?? "Student",
//       interests: (otherProfile.interests ?? [])
//         .map(normalizeInterest)
//         .filter(Boolean) as string[],
//       skillLevel: normalizeSkillLevel(otherProfile.skillLevel),
//       matchScore: score,
//       stats: { questionsAsked: 0, answersGiven: 0 },
//     });
//   }

//   return matches
//     .sort((a, b) => b.matchScore - a.matchScore)
//     .slice(0, limit);
// }
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// /* ================= TYPES ================= */

// export type SkillLevel = "beginner" | "intermediate" | "advanced";

// export interface UserProfile {
//   displayName?: string;
//   interests?: any[]; // allow dirty data
//   skillLevel?: SkillLevel | string;
// }

// export interface MatchedPeer {
//   id: string;
//   name: string;
//   interests: string[];
//   skillLevel: SkillLevel;
//   matchScore: number;
// }

// /* ================= NORMALIZERS ================= */

// function normalizeInterest(v: any): string | null {
//   if (!v) return null;
//   if (typeof v === "string") return v.trim().toLowerCase();
//   if (typeof v === "object" && v.id) return String(v.id).toLowerCase();
//   return null;
// }

// function normalizeSkill(level?: string): SkillLevel {
//   if (!level) return "intermediate";
//   const l = level.toLowerCase();
//   if (l === "beginner") return "beginner";
//   if (l === "advanced") return "advanced";
//   return "intermediate";
// }

// /* ================= SCORE ================= */

// function calculateMatchScore(
//   me: UserProfile,
//   other: UserProfile
// ): number {
//   const myInterests = (me.interests ?? [])
//     .map(normalizeInterest)
//     .filter(Boolean) as string[];

//   const theirInterests = (other.interests ?? [])
//     .map(normalizeInterest)
//     .filter(Boolean) as string[];

//   // 🚨 DEBUG (REMOVE LATER)
//   console.log("ME:", myInterests);
//   console.log("THEM:", theirInterests);

//   const shared = myInterests.filter(i => theirInterests.includes(i));
//   if (shared.length === 0) return 0;

//   let score = 0;

//   // Interests (50)
//   score += Math.min(50, shared.length * 25);

//   // Skill level (30)
//   const map = { beginner: 0, intermediate: 1, advanced: 2 };
//   const diff = Math.abs(
//     map[normalizeSkill(me.skillLevel)] -
//     map[normalizeSkill(other.skillLevel)]
//   );
//   score += diff === 0 ? 30 : diff === 1 ? 20 : 10;

//   // Complementary (20)
//   score += Math.min(
//     20,
//     theirInterests.filter(i => !myInterests.includes(i)).length * 5
//   );

//   return Math.min(100, score);
// }

// /* ================= MAIN ================= */

// export async function getMatchedPeers(
//   userId: string,
//   limit = 10
// ): Promise<MatchedPeer[]> {

//   const meSnap = await getDoc(doc(db, "users", userId));
//   if (!meSnap.exists()) return [];

//   const me = meSnap.data() as UserProfile;

//   const snap = await getDocs(collection(db, "users"));
//   const matches: MatchedPeer[] = [];

//   for (const d of snap.docs) {
//     if (d.id === userId) continue;

//     const other = d.data() as UserProfile;
//     const score = calculateMatchScore(me, other);

//     if (score === 0) continue; // remove irrelevant users

//     matches.push({
//       id: d.id,
//       name: other.displayName ?? "Student",
//       interests: (other.interests ?? [])
//         .map(normalizeInterest)
//         .filter(Boolean) as string[],
//       skillLevel: normalizeSkill(other.skillLevel),
//       matchScore: score,
//     });
//   }

//   return matches
//     .sort((a, b) => b.matchScore - a.matchScore)
//     .slice(0, limit);
// }
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

/* ================= TYPES ================= */

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  displayName?: string;
  interests?: string[];
  skillLevel?: SkillLevel;
}

export interface MatchedPeer {
  id: string;
  name: string;
  interests: string[];
  skillLevel: SkillLevel;
  matchScore: number;
}

/* ================= HELPERS ================= */

function normalize(v?: string) {
  return v?.trim().toLowerCase();
}

/* ================= SCORE ================= */

function calculateMatchScore(
  me: UserProfile,
  other: UserProfile
): number {
  let score = 0;

  const myInterests = (me.interests ?? []).map(normalize).filter(Boolean);
  const theirInterests = (other.interests ?? []).map(normalize).filter(Boolean);

  /* ---------- INTEREST MATCH (60) ---------- */
  const shared = myInterests.filter(i => theirInterests.includes(i));

  if (shared.length > 0) {
    score += Math.min(60, shared.length * 30);
  } else {
    score += 10; // 👈 fallback instead of removing user
  }

  /* ---------- SKILL LEVEL (30) ---------- */
  const levelMap: Record<SkillLevel, number> = {
    beginner: 0,
    intermediate: 1,
    advanced: 2,
  };

  const diff = Math.abs(
    levelMap[me.skillLevel ?? "intermediate"] -
    levelMap[other.skillLevel ?? "intermediate"]
  );

  score += diff === 0 ? 30 : diff === 1 ? 20 : 10;

  /* ---------- BONUS (10) ---------- */
  if (theirInterests.length > 0) score += 10;

  return Math.min(100, Math.round(score));
}

/* ================= MAIN ================= */

export async function getMatchedPeers(
  currentUserId: string,
  limit = 10
): Promise<MatchedPeer[]> {

  const meSnap = await getDoc(doc(db, "users", currentUserId));
  if (!meSnap.exists()) return [];

  const me = meSnap.data() as UserProfile;

  const snap = await getDocs(collection(db, "users"));
  const matches: MatchedPeer[] = [];

  for (const d of snap.docs) {
    if (d.id === currentUserId) continue;

    const other = d.data() as UserProfile;

    const score = calculateMatchScore(me, other);

    matches.push({
      id: d.id,
      name: other.displayName ?? "Student",
      interests: other.interests ?? [],
      skillLevel: other.skillLevel ?? "intermediate",
      matchScore: score,
    });
  }

  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
