// // import { motion } from "motion/react";
// // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // import { Badge } from "./ui/badge";
// // import {
// //   ArrowUp,
// //   MessageCircle,
// //   Eye,
// //   Clock,
// //   TrendingUp,
// //   Flame,
// //   Bookmark,
// // } from "lucide-react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { upvoteQuestion } from "../lib/firestore";

// // /* ---------------- COMPONENT ---------------- */

// // export function QuestionCard({ question, delay = 0 }) {
// //   const navigate = useNavigate();

// //   const [upvotes, setUpvotes] = useState(question.upvotes);
// //   const [hasUpvoted, setHasUpvoted] = useState(question.hasUpvoted || false);
// //   const [isBookmarked, setIsBookmarked] = useState(
// //     question.isBookmarked || false
// //   );

// //   /* ---------------- HANDLERS ---------------- */
// // const handleUpvote = async (e) => {
// //   e.stopPropagation();

// //   if (!hasUpvoted) {
// //     await upvoteQuestion(question.id);
// //     setUpvotes(v => v + 1);
// //     setHasUpvoted(true);
// //   }
// // };

// //   const handleBookmark = (e) => {
// //     e.stopPropagation();
// //     setIsBookmarked((v) => !v);
// //   };

// //   /* ---------------- RENDER ---------------- */

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4, delay }}
// //       whileHover={{ y: -4, transition: { duration: 0.2 } }}
// //       onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)}
// //       className="
// //         bg-white
// //         rounded-xl
// //         border border-gray-200
// //         p-6
// //         shadow-sm
// //         hover:shadow-md
// //         transition-shadow
// //         cursor-pointer
// //         group
// //       "
// //     >
// //       <div className="flex gap-4">
// //         {/* Upvote */}
// //         <div className="flex flex-col items-center gap-2">
// //           <motion.button
// //             onClick={handleUpvote}
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.9 }}
// //             className={`w-12 h-12 rounded-lg flex items-center justify-center ${
// //               hasUpvoted
// //                 ? "bg-blue-100 text-blue-600"
// //                 : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
// //             }`}
// //           >
// //             <ArrowUp
// //               className={`size-5 ${hasUpvoted ? "fill-blue-600" : ""}`}
// //             />
// //           </motion.button>

// //           <span
// //             className={`font-bold text-sm ${
// //               hasUpvoted ? "text-blue-600" : "text-gray-700"
// //             }`}
// //           >
// //             {upvotes}
// //           </span>
// //         </div>

// //         {/* Content */}
// //         <div className="flex-1 min-w-0">
// //           {/* Header */}
// //           <div className="flex items-start justify-between mb-3">
// //             <div className="flex items-center gap-2">
// //               <Avatar className="size-8">
// //                 <AvatarImage src={question.author.avatar} />
// //                 <AvatarFallback>
// //                   {question.author.initials}
// //                 </AvatarFallback>
// //               </Avatar>

// //               <div>
// //                 <p className="text-sm font-medium">
// //                   {question.author.name}
// //                 </p>
// //                 <div className="flex items-center gap-1 text-xs text-gray-500">
// //                   <Clock className="size-3" />
// //                   {question.timeAgo}
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex gap-2">
// //               {question.trending && (
// //                 <Badge className="bg-orange-500 text-white">
// //                   <TrendingUp className="size-3 mr-1" />
// //                   Trending
// //                 </Badge>
// //               )}
// //               {question.hot && (
// //                 <Badge className="bg-red-500 text-white">
// //                   <Flame className="size-3 mr-1" />
// //                   Hot
// //                 </Badge>
// //               )}
// //             </div>
// //           </div>

// //           {/* Title */}
// //           <h3 className="font-bold mb-2 group-hover:text-blue-600">
// //             {question.title}
// //           </h3>

// //           {/* Preview */}
// //           <p className="text-sm text-gray-600 mb-3 line-clamp-2">
// //             {question.content}
// //           </p>

// //           {/* Tags */}
// //           <div className="flex flex-wrap gap-1 mb-4">
// //             {question.tags.map((tag) => (
// //               <Badge key={tag} variant="secondary">
// //                 {tag}
// //               </Badge>
// //             ))}
// //           </div>

// //           {/* Stats */}
// //           <div className="flex justify-between items-center text-sm text-gray-500">
// //             <div className="flex gap-4">
// //              <span className="flex items-center gap-1">
// //   <MessageCircle className="size-4" />
// //   {question.repliesCount ?? 0}
// // </span>

// //               <span className="flex items-center gap-1">
// //                 <Eye className="size-4" />
// //                 {question.views}
// //               </span>
// //             </div>

// //             <motion.button
// //               onClick={handleBookmark}
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.9 }}
// //               className={`p-2 rounded-lg ${
// //                 isBookmarked
// //                   ? "bg-yellow-100 text-yellow-600"
// //                   : "text-gray-400 hover:bg-gray-100"
// //               }`}
// //             >
// //               <Bookmark
// //                 className={`size-4 ${
// //                   isBookmarked ? "fill-yellow-600" : ""
// //                 }`}
// //               />
// //             </motion.button>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }
// // import { motion } from "motion/react";
// // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // import { Badge } from "./ui/badge";
// // import {
// //   ArrowUp,
// //   MessageCircle,
// //   Eye,
// //   Clock,
// //   Bookmark,
// // } from "lucide-react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { upvoteQuestion } from "../lib/firestore";

// // export function QuestionCard({ question, delay = 0 }) {
// //   const navigate = useNavigate();

// //   const [upvotes, setUpvotes] = useState(question.upvotes);
// //   const [hasUpvoted, setHasUpvoted] = useState(false);

// //   const handleUpvote = async (e) => {
// //     e.stopPropagation();

// //     if (hasUpvoted) return;

// //     await upvoteQuestion(question.id); // ✅ Firestore ID
// //     setUpvotes((v) => v + 1);
// //     setHasUpvoted(true);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay }}
// //       onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)} // ✅ FIX
// //       className="bg-white rounded-xl border p-6 cursor-pointer"
// //     >
// //       <div className="flex gap-4">
// //         <button onClick={handleUpvote} className="w-10 h-10 rounded bg-gray-100">
// //           <ArrowUp />
// //           {upvotes}
// //         </button>

// //         <div className="flex-1">
// //           <div className="flex items-center gap-2">
// //             <Avatar className="size-8">
// //               <AvatarImage src={question.author.avatar} />
// //               <AvatarFallback>{question.author.initials}</AvatarFallback>
// //             </Avatar>
// //             <span>{question.author.name}</span>
// //             <Clock className="size-3 ml-2" />
// //             <span className="text-xs">{question.timeAgo}</span>
// //           </div>

// //           <h3 className="font-bold mt-2">{question.title}</h3>

// //           <p className="text-sm text-gray-600 mt-1 line-clamp-2">
// //             {question.content}
// //           </p>

// //           <div className="flex gap-4 mt-3 text-sm text-gray-500">
// //             <span><MessageCircle /> {question.repliesCount}</span>
// //             <span><Eye /> {question.views}</span>
// //             <Bookmark />
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }
// import { motion } from "motion/react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import {
//   ArrowUp,
//   MessageCircle,
//   Eye,
//   Clock,
//   Bookmark,
// } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { upvoteQuestion } from "../lib/firestore";

// export function QuestionCard({ question, delay = 0 }) {
//   const navigate = useNavigate();
//   const [upvotes, setUpvotes] = useState(question.upvotes);
//   const [hasUpvoted, setHasUpvoted] = useState(false);

//   const handleUpvote = async (e) => {
//     e.stopPropagation();
//     if (hasUpvoted) return;

//     await upvoteQuestion(question.id);
//     setUpvotes((v) => v + 1);
//     setHasUpvoted(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay }}
//       onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)}
//       className="bg-white rounded-xl border p-6 cursor-pointer hover:shadow-md transition"
//     >
//       <div className="flex gap-6">
//         {/* Upvote column */}
//         <div className="flex flex-col items-center">
//           <button
//             onClick={handleUpvote}
//             className={`w-10 h-10 rounded-lg flex items-center justify-center border
//               ${hasUpvoted ? "bg-orange-100 text-orange-600" : "bg-gray-50 text-gray-400"}
//             `}
//           >
//             <ArrowUp className="size-5" />
//           </button>
//           <span className="text-sm font-semibold mt-1">{upvotes}</span>
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           {/* Author */}
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Avatar className="size-8">
//               <AvatarImage src={question.author.avatar} />
//               <AvatarFallback>{question.author.initials}</AvatarFallback>
//             </Avatar>
//             <span className="font-medium text-gray-700">
//               {question.author.name}
//             </span>
//             <Clock className="size-3 ml-2" />
//             <span>{question.timeAgo}</span>
//           </div>

//           {/* Title */}
//           <h3 className="font-semibold text-lg mt-2 text-gray-900">
//             {question.title}
//           </h3>

//           {/* Preview */}
//           <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//             {question.content}
//           </p>

//           {/* Footer stats */}
//           <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <MessageCircle className="size-4" />
//               {question.repliesCount}
//             </span>
//             <span className="flex items-center gap-1">
//               <Eye className="size-4" />
//               {question.views}
//             </span>
//             <Bookmark className="size-4 ml-auto hover:text-gray-700" />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowUp,
  MessageCircle,
  Eye,
  Clock,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upvoteQuestion } from "../lib/firestore";

export function QuestionCard({ question, delay = 0 }) {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(question.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = async (e) => {
    e.stopPropagation();
    if (hasUpvoted) return;

    await upvoteQuestion(question.id);
    setUpvotes((v) => v + 1);
    setHasUpvoted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)}
      className="
        bg-white
        rounded-xl
        border
        p-4 sm:p-6
        cursor-pointer
        hover:shadow-md
        transition
      "
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* ---------- UPVOTE ---------- */}
        <div className="flex sm:flex-col items-center gap-2 sm:gap-1">
          <button
            onClick={handleUpvote}
            className={`
              w-9 h-9 sm:w-10 sm:h-10
              rounded-lg
              flex items-center justify-center
              border
              ${
                hasUpvoted
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }
            `}
          >
            <ArrowUp className="size-4 sm:size-5" />
          </button>

          <span className="text-sm font-semibold">{upvotes}</span>
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="flex-1 min-w-0">
          {/* Author row */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Avatar className="size-7 sm:size-8">
              <AvatarImage src={question.author.avatar} />
              <AvatarFallback>
                {question.author.initials}
              </AvatarFallback>
            </Avatar>

            <span className="font-medium text-gray-700">
              {question.author.name}
            </span>

            <Clock className="size-3 ml-1" />
            <span>{question.timeAgo}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base sm:text-lg mt-2 text-gray-900 line-clamp-2">
            {question.title}
          </h3>

          {/* Preview */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {question.content}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 sm:gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              {question.repliesCount}
            </span>

            <span className="flex items-center gap-1">
              <Eye className="size-4" />
              {question.views}
            </span>

            <Bookmark className="size-4 ml-auto hover:text-gray-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
