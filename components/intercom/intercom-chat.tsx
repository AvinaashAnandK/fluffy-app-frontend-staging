"use client";
import Intercom from "@intercom/messenger-js-sdk";

interface IntercomChatProps {
    userId: string;
    userName: string;
    userEmail: string;
  }

  export default function IntercomChat({ userId, userEmail, userName }: IntercomChatProps) {
    Intercom({
      app_id: 'onhr6vmb',
      user_id: userId || "test", 
      name: userName, 
      email: userEmail, 
    });
  
    return null;
  }