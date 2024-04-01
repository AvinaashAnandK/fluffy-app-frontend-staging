import { Navbar } from "@/components/globalComponents/navbar"
import { Sidebar } from "@/components/globalComponents/sidebar"
import { RepoChatHistoryProvider } from "@/lib/hooks/use-repochathistory";

const DashboardLayout = async ({
    children 
} : {
    children: React.ReactNode;
}) => {


    return (
        <div className="h-full">
            <Navbar />
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar />
            </div>
            <main className="p-2 md:pl-20 pt-16 h-full bg-black">
                <div className="">
                <RepoChatHistoryProvider>
                    {children}
                </RepoChatHistoryProvider>
                </div>
            </main>
        </div>
     );
}
 
export default DashboardLayout;