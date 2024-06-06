import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

//[TO-DO] Remove Repochat

const publicRoutes = [
      "/", 
      "/api/dboperations/apiLimits/checkLimit",      
      "/api/dboperations/apiLimits/createLimit",
      "/api/dboperations/apiLimits/fetchAllLimits",
      "/api/dboperations/apiLimits/fetchLimit",
      "/api/dboperations/apiLimits/updateLimit",
      "/api/dboperations/apiLimits/updatePurchase",
      "/api/dboperations/userPreferences/createUser",
      "/api/dboperations/userPreferences/fetchUser",
      "/api/dboperations/chatHistory/createChat",
      "/api/dboperations/chatHistory/shareChat",
      "/api/dboperations/chatHistory/deleteChat",
      "/api/dboperations/chatHistory/fetchChat",
      "/api/dboperations/chatHistory/fetchUserChats",
      "/api/dboperations/chatHistory/updateChat",
      "/api/fetchsources",
      "/api/dbcalls/checkrepolimit",
      "/api/dbcalls/checkchatlimit",
      "/api/dbcalls/increaserepolimit",
      "/api/dbcalls/increasechatlimit",
      "/api/repochatep",
      "/api/dbcalls/chat/clearchats",
      "/api/dbcalls/chat/createchat",
      "/api/dbcalls/chat/getchat",
      "/api/dbcalls/chat/getchats",
      "/api/dbcalls/chat/removechat",
      "/api/dbcalls/chat/sharechat",
      "/api/dbcalls/chat/getsharedchat",
]; 

export default authMiddleware({
      publicRoutes,
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 