import { Navbar } from "@/components/globalComponents/navbar"
import { Sidebar } from "@/components/globalComponents/sidebar"
import { auth } from '@clerk/nextjs/server';

const DashboardLayout = async ({
    children 
} : {
    children: React.ReactNode;
}) => {
    const { userId, sessionClaims } = auth();
    const userEmail: string = (sessionClaims?.email as string) || "";
    const userName: string = (sessionClaims?.fullName as string) || "";

    return (
        <div className="h-full">
            <Navbar/>
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar />
            </div>
            <main className="p-2 md:pl-20 pt-16 h-full">
                <div>
                    {children}
                    
                </div>
            </main>
        </div>
     );
}
 
export default DashboardLayout;