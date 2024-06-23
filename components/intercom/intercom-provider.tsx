import IntercomChat from "./intercom-chat";
import { auth } from '@clerk/nextjs/server';

export const IntercomProvider = () => {
    const { userId, sessionClaims } = auth();
    const userEmail: string = (sessionClaims?.email as string) || "";
    const userName: string = (sessionClaims?.fullName as string) || "";

    return (
        <IntercomChat userId={userId || "default"} userName={userName} userEmail={userEmail} />
    );
}