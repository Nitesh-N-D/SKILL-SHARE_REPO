// // // import { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "motion/react";
// // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // import { Button } from "./ui/button";
// // import { Textarea } from "./ui/textarea";
// // import { Badge } from "./ui/badge";
// // import { MessageCircle, Clock, Check, ArrowUp } from "lucide-react";
// // import { useAuth } from "../../hooks/useAuth";
// // import { toast } from "sonner";
// // import type { JSX } from "react";
// // import { useState } from "react";

// // /* ---------------- TYPES ---------------- */

// // export interface Reply {
// //   id: string;
// //   content: string;
// //   upvotes: number;
// //   hasUpvoted?: boolean;
// //   isAccepted?: boolean;
// //   timeAgo?: string;
// //   author: {
// //     name: string;
// //     avatar?: string;
// //     initials: string;
// //     reputation?: number;
// //   };
// // }

// // interface ReplySectionProps {
// //   replies?: Reply[]; // ✅ optional & safe
// //   onReplySubmit: (content: string) => Promise<void>;
// // }

// // /* ---------------- COMPONENT ---------------- */

// // export function ReplySection({
// //   replies = [], // ✅ default empty array
// //   onReplySubmit,
// // }: ReplySectionProps): JSX.Element {
// //   const { user } = useAuth();

// //   const [replyContent, setReplyContent] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   /* ⬆️ UI-only upvote */
// //   const handleUpvote = (replyId: string) => {
// //     // purely visual – no backend
// //   };

// //   /* 📤 Submit reply */
// //   const handleSubmit = async () => {
// //     if (!user) {
// //       toast.error("Please login to post an answer");
// //       return;
// //     }

// //     if (!replyContent.trim()) {
// //       toast.error("Reply cannot be empty");
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       await onReplySubmit(replyContent.trim());
// //       setReplyContent("");
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to post reply");
// //     } finally {
// //       setIsSubmitting(false); // ✅ NEVER gets stuck
// //     }
// //   };

// //   /* ---------------- RENDER ---------------- */

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center gap-2">
// //         <MessageCircle className="size-5 text-gray-600" />
// //         <h3 className="font-semibold">
// //           {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
// //         </h3>
// //       </div>

// //       {/* Replies List */}
// //       <AnimatePresence>
// //         {replies.map((reply, index) => (
// //           <motion.div
// //             key={reply.id}
// //             initial={{ opacity: 0, y: 12 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ delay: index * 0.05 }}
// //             className={`rounded-xl border p-5 bg-white ${
// //               reply.isAccepted ? "border-green-400 bg-green-50/40" : ""
// //             }`}
// //           >
// //             <div className="flex gap-4">
// //               {/* Upvote */}
// //               <div className="flex flex-col items-center">
// //                 <button
// //                   onClick={() => handleUpvote(reply.id)}
// //                   className="w-9 h-9 rounded-lg bg-gray-100 text-gray-400"
// //                 >
// //                   <ArrowUp className="size-4" />
// //                 </button>
// //                 <span className="text-sm font-bold">{reply.upvotes}</span>
// //               </div>

// //               {/* Content */}
// //               <div className="flex-1">
// //                 <div className="flex justify-between mb-2">
// //                   <div className="flex items-center gap-3">
// //                     <Avatar className="size-9">
// //                       <AvatarImage src={reply.author.avatar} />
// //                       <AvatarFallback>
// //                         {reply.author.initials}
// //                       </AvatarFallback>
// //                     </Avatar>

// //                     <div>
// //                       <p className="font-medium">{reply.author.name}</p>
// //                       <span className="text-xs text-gray-500 flex items-center gap-1">
// //                         <Clock className="size-3" />
// //                         {reply.timeAgo ?? "just now"}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {reply.isAccepted && (
// //                     <Badge className="bg-green-600 text-white">
// //                       <Check className="size-3 mr-1" />
// //                       Accepted
// //                     </Badge>
// //                   )}
// //                 </div>

// //                 <p className="text-gray-700 whitespace-pre-wrap">
// //                   {reply.content}
// //                 </p>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </AnimatePresence>

// //       {/* Add Reply */}
// //       <div className="rounded-xl border bg-blue-50 p-5">
// //         <h4 className="font-semibold mb-2">Your Answer</h4>

// //         {!user ? (
// //           <p className="text-sm text-gray-600">
// //             Please login to post an answer.
// //           </p>
// //         ) : (
// //           <>
// //             <Textarea
// //               rows={4}
// //               value={replyContent}
// //               onChange={(e) => setReplyContent(e.target.value)}
// //               placeholder="Write a helpful reply…"
// //             />

// //             <div className="flex justify-end mt-3">
// //               <Button
// //                 onClick={handleSubmit}
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? "Posting…" : "Post Reply"}
// //               </Button>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// // // import { motion, AnimatePresence } from "motion/react";
// // // import { Avatar, AvatarFallback } from "./ui/avatar";
// // // import { Button } from "./ui/button";
// // // import { Textarea } from "./ui/textarea";
// // // import { MessageCircle, Clock, ArrowUp } from "lucide-react";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import type { JSX } from "react";
// // // import { useState } from "react";

// // // export interface Reply {
// // //   id: string;
// // //   content: string;
// // //   upvotes: number;
// // //   author: {
// // //     name: string;
// // //     initials: string;
// // //   };
// // // }

// // // interface ReplySectionProps {
// // //   replies?: Reply[];
// // //   onReplySubmit: (content: string) => Promise<void>;
// // // }

// // // export function ReplySection({
// // //   replies = [],
// // //   onReplySubmit,
// // // }: ReplySectionProps): JSX.Element {
// // //   const { user } = useAuth();

// // //   const [replyContent, setReplyContent] = useState("");
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   const handleSubmit = async () => {
// // //     if (!replyContent.trim() || !user) return;

// // //     setIsSubmitting(true);
// // //     await onReplySubmit(replyContent.trim());
// // //     setReplyContent("");
// // //     setIsSubmitting(false);
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center gap-2">
// // //         <MessageCircle className="size-5" />
// // //         <h3 className="font-semibold">{replies.length} Replies</h3>
// // //       </div>

// // //       <AnimatePresence>
// // //         {replies.map((reply) => (
// // //           <motion.div
// // //             key={reply.id}
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             className="border rounded-xl p-4 bg-white"
// // //           >
// // //             <div className="flex gap-4">
// // //               <button className="w-9 h-9 rounded bg-gray-100">
// // //                 <ArrowUp />
// // //                 {reply.upvotes}
// // //               </button>

// // //               <div>
// // //                 <div className="flex items-center gap-2 mb-1">
// // //                   <Avatar>
// // //                     <AvatarFallback>{reply.author.initials}</AvatarFallback>
// // //                   </Avatar>
// // //                   <span className="font-medium">{reply.author.name}</span>
// // //                   <Clock className="size-3" />
// // //                   <span className="text-xs">just now</span>
// // //                 </div>
// // //                 <p>{reply.content}</p>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         ))}
// // //       </AnimatePresence>

// // //       {user && (
// // //         <div className="border rounded-xl bg-blue-50 p-4">
// // //           <Textarea
// // //             rows={4}
// // //             value={replyContent}
// // //             onChange={(e) => setReplyContent(e.target.value)}
// // //             placeholder="Write your reply…"
// // //           />
// // //           <div className="flex justify-end mt-3">
// // //             <Button onClick={handleSubmit} disabled={isSubmitting}>
// // //               {isSubmitting ? "Posting…" : "Post Reply"}
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import { motion, AnimatePresence } from "motion/react";
// // import { Avatar, AvatarFallback } from "./ui/avatar";
// // import { Button } from "./ui/button";
// // import { Textarea } from "./ui/textarea";
// // import { MessageCircle, Clock, ArrowUp } from "lucide-react";
// // import { useAuth } from "../../hooks/useAuth";
// // import { useState } from "react";
// // import type { JSX } from "react";

// // export interface Reply {
// //   id: string;
// //   content: string;
// //   upvotes: number;
// //   author: {
// //     name: string;
// //     initials: string;
// //   };
// // }

// // interface ReplySectionProps {
// //   replies?: Reply[];
// //   onReplySubmit: (content: string) => Promise<void>;
// // }

// // export function ReplySection({
// //   replies = [],
// //   onReplySubmit,
// // }: ReplySectionProps): JSX.Element {
// //   const { user } = useAuth();
// //   const [replyContent, setReplyContent] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleSubmit = async () => {
// //     if (!replyContent.trim() || !user) return;

// //     setIsSubmitting(true);
// //     await onReplySubmit(replyContent.trim());
// //     setReplyContent("");
// //     setIsSubmitting(false);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center gap-2">
// //         <MessageCircle className="size-5 text-gray-600" />
// //         <h3 className="font-semibold">
// //           {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
// //         </h3>
// //       </div>

// //       {/* Replies */}
// //       <AnimatePresence>
// //         {replies.map((reply) => (
// //           <motion.div
// //             key={reply.id}
// //             initial={{ opacity: 0, y: 8 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="rounded-xl border bg-white p-5"
// //           >
// //             <div className="flex gap-4">
// //               <div className="flex flex-col items-center">
// //                 <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-400">
// //                   <ArrowUp className="size-4" />
// //                 </button>
// //                 <span className="text-sm font-semibold">
// //                   {reply.upvotes}
// //                 </span>
// //               </div>

// //               <div className="flex-1">
// //                 <div className="flex items-center gap-2 mb-1">
// //                   <Avatar className="size-8">
// //                     <AvatarFallback>
// //                       {reply.author.initials}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <span className="font-medium">
// //                     {reply.author.name}
// //                   </span>
// //                   <Clock className="size-3 text-gray-400 ml-2" />
// //                   <span className="text-xs text-gray-500">
// //                     just now
// //                   </span>
// //                 </div>

// //                 <p className="text-gray-700 whitespace-pre-wrap">
// //                   {reply.content}
// //                 </p>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </AnimatePresence>

// //       {/* Reply box */}
// //       {user && (
// //         <div className="rounded-xl border bg-blue-50 p-5">
// //           <Textarea
// //             rows={4}
// //             value={replyContent}
// //             onChange={(e) => setReplyContent(e.target.value)}
// //             placeholder="Write a helpful reply…"
// //           />

// //           <div className="flex justify-end mt-3">
// //             <Button
// //               onClick={handleSubmit}
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? "Posting…" : "Post Reply"}
// //             </Button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { motion, AnimatePresence } from "motion/react";
// import { Avatar, AvatarFallback } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { MessageCircle, Clock, ArrowUp } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";
// import { useState } from "react";
// import type { JSX } from "react";

// export interface Reply {
//   id: string;
//   content: string;
//   upvotes: number;
//   author: {
//     name: string;
//     initials: string;
//   };
// }

// interface ReplySectionProps {
//   replies?: Reply[];
//   onReplySubmit: (content: string) => Promise<void>;
// }

// export function ReplySection({
//   replies = [],
//   onReplySubmit,
// }: ReplySectionProps): JSX.Element {
//   const { user } = useAuth();
//   const [replyContent, setReplyContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!replyContent.trim() || !user) return;
//     setIsSubmitting(true);
//     await onReplySubmit(replyContent.trim());
//     setReplyContent("");
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 text-gray-700">
//         <MessageCircle className="size-5" />
//         <h3 className="font-semibold">
//           {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
//         </h3>
//       </div>

//       {/* Replies */}
//       <AnimatePresence>
//         {replies.map((reply) => (
//           <motion.div
//             key={reply.id}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-xl border bg-white p-5"
//           >
//             <div className="flex gap-5">
//               {/* Upvote */}
//               <div className="flex flex-col items-center">
//                 <button className="w-9 h-9 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center">
//                   <ArrowUp className="size-4" />
//                 </button>
//                 <span className="text-sm font-semibold mt-1">
//                   {reply.upvotes}
//                 </span>
//               </div>

//               {/* Content */}
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
//                   <Avatar className="size-8">
//                     <AvatarFallback>
//                       {reply.author.initials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <span className="font-medium text-gray-700">
//                     {reply.author.name}
//                   </span>
//                   <Clock className="size-3 ml-2" />
//                   <span>just now</span>
//                 </div>

//                 <p className="text-gray-700 whitespace-pre-wrap">
//                   {reply.content}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       {/* Reply box */}
//       {user && (
//         <div className="rounded-xl border bg-blue-50 p-5">
//           <Textarea
//             rows={4}
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//             placeholder="Write a helpful reply…"
//           />
//           <div className="flex justify-end mt-3">
//             <Button onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? "Posting…" : "Post Reply"}
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Clock, ArrowUp } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { JSX } from "react";

export interface Reply {
  id: string;
  content: string;
  upvotes: number;
  author: {
    name: string;
    initials: string;
  };
}

interface ReplySectionProps {
  replies?: Reply[];
  onReplySubmit: (content: string) => Promise<void>;
}

export function ReplySection({
  replies = [],
  onReplySubmit,
}: ReplySectionProps): JSX.Element {
  const { user } = useAuth();
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!replyContent.trim() || !user) return;
    setIsSubmitting(true);
    await onReplySubmit(replyContent.trim());
    setReplyContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700">
        <MessageCircle className="size-5" />
        <h3 className="font-semibold text-sm sm:text-base">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h3>
      </div>

      {/* Replies */}
      <AnimatePresence>
        {replies.map((reply) => (
          <motion.div
            key={reply.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-xl border bg-white
              p-4 sm:p-5
            "
          >
            <div
              className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-5
              "
            >
              {/* Upvote */}
              <div
                className="
                  flex flex-row sm:flex-col
                  items-center
                  gap-2 sm:gap-1
                  shrink-0
                "
              >
                <button
                  className="
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-lg
                    bg-gray-100 text-gray-400
                    flex items-center justify-center
                  "
                >
                  <ArrowUp className="size-4" />
                </button>
                <span className="text-sm font-semibold">
                  {reply.upvotes}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div
                  className="
                    flex flex-wrap items-center
                    gap-x-2 gap-y-1
                    mb-1
                    text-xs sm:text-sm
                    text-gray-500
                  "
                >
                  <Avatar className="size-7 sm:size-8">
                    <AvatarFallback>
                      {reply.author.initials}
                    </AvatarFallback>
                  </Avatar>

                  <span className="font-medium text-gray-700">
                    {reply.author.name}
                  </span>

                  <span className="hidden sm:inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    just now
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Reply box */}
      {user && (
        <div
          className="
            rounded-xl border bg-blue-50
            p-4 sm:p-5
          "
        >
          <Textarea
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a helpful reply…"
          />

          <div className="flex justify-end mt-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Posting…" : "Post Reply"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
