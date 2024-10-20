// import { useState, useEffect } from "react";
// import {
//   SearchIcon,
//   Plus,
//   FileText,
//   File,
//   Mail,
//   Clipboard,
//   Book,
//   MoreVertical,
//   Grid,
//   ArrowUpDown,
//   Moon,
//   Sun,
//   Trash,
//   Copy,
//   Download,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { motion } from "framer-motion";

// export default function Component() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const templates = [
//     {
//       name: "Blank document",
//       icon: <FileText className="h-8 w-8 text-blue-500" />,
//     },
//     { name: "Resume", icon: <File className="h-8 w-8 text-green-500" /> },
//     { name: "Letter", icon: <Mail className="h-8 w-8 text-red-500" /> },
//     {
//       name: "Project proposal",
//       icon: <Clipboard className="h-8 w-8 text-purple-500" />,
//     },
//     { name: "Brochure", icon: <Book className="h-8 w-8 text-yellow-500" /> },
//   ];

//   const recentDocuments = [
//     { name: "Marketing Strategy", lastOpened: "2 days ago" },
//     { name: "Q3 Report", lastOpened: "1 week ago" },
//     { name: "Team Meeting Notes", lastOpened: "3 days ago" },
//   ];

//   const iconAnimation = {
//     hover: { scale: 1.2, rotate: 5 },
//     tap: { scale: 0.8, rotate: -5 },
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
//       } p-8 transition-colors duration-200`}
//     >
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">EnhancedDocs</h1>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search documents"
//               className={`pl-10 w-64 ${
//                 darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//               }`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Button variant="outline">
//             <Plus className="mr-2 h-4 w-4" />
//             New
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setView(view === "grid" ? "list" : "grid")}
//           >
//             {view === "grid" ? (
//               <Grid className="h-4 w-4" />
//             ) : (
//               <FileText className="h-4 w-4" />
//             )}
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? (
//               <Sun className="h-4 w-4" />
//             ) : (
//               <Moon className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </header>

//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4">Start a new document</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {templates.map((template, index) => (
//             <div
//               key={index}
//               className={`${
//                 darkMode ? "bg-gray-800" : "bg-white"
//               } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
//             >
//               {template.icon}
//               <p className="mt-2 text-sm">{template.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Recent documents</h2>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm">
//                 <ArrowUpDown className="mr-2 h-4 w-4" />
//                 Sort
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               align="end"
//               className={
//                 darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//               }
//             >
//               <DropdownMenuItem>Name</DropdownMenuItem>
//               <DropdownMenuItem>Last opened</DropdownMenuItem>
//               <DropdownMenuItem>Last modified</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div
//           className={`grid ${
//             view === "grid"
//               ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//               : "grid-cols-1"
//           } gap-4`}
//         >
//           {recentDocuments.map((doc, index) => (
//             <div
//               key={index}
//               className={`${
//                 darkMode ? "bg-gray-800" : "bg-white"
//               } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center`}
//             >
//               <div className="flex items-center">
//                 <motion.div
//                   whileHover="hover"
//                   whileTap="tap"
//                   variants={iconAnimation}
//                 >
//                   <FileText className="h-6 w-6 text-gray-500 mr-3" />
//                 </motion.div>
//                 <div>
//                   <p className="font-medium">{doc.name}</p>
//                   <p
//                     className={`text-sm ${
//                       darkMode ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     Last opened: {doc.lastOpened}
//                   </p>
//                 </div>
//               </div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
//                   >
//                     <motion.div
//                       whileHover="hover"
//                       whileTap="tap"
//                       variants={iconAnimation}
//                     >
//                       <MoreVertical className="h-4 w-4" />
//                     </motion.div>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className={
//                     darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//                   }
//                 >
//                   <DropdownMenuItem>
//                     <motion.div
//                       whileHover="hover"
//                       whileTap="tap"
//                       variants={iconAnimation}
//                     >
//                       <Trash className="mr-2 h-4 w-4" />
//                     </motion.div>
//                     Delete
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <motion.div
//                       whileHover="hover"
//                       whileTap="tap"
//                       variants={iconAnimation}
//                     >
//                       <Copy className="mr-2 h-4 w-4" />
//                     </motion.div>
//                     Copy to new
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <motion.div
//                       whileHover="hover"
//                       whileTap="tap"
//                       variants={iconAnimation}
//                     >
//                       <Download className="mr-2 h-4 w-4" />
//                     </motion.div>
//                     Download
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
