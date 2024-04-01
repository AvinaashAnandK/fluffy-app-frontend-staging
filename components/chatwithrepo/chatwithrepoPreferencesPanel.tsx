import KnowTheRepoProps from "@/components/chatwithrepo/leftpanelcomponents/knowrepoprops";
import CoderProps from "@/components/chatwithrepo/leftpanelcomponents/coderprops";
import FluffyResponseProps from "@/components/chatwithrepo/leftpanelcomponents/fluffyresponseprops";
import LanguageOptionsProps from "@/components/chatwithrepo/leftpanelcomponents/coderlanguageprops";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import ChatRepoTasksProps from "@/components/chatwithrepo/leftpanelcomponents/chatrepotasks";
import { Button } from "@/components/ui/button";

const UserPreferencesChat = () => {
    return ( 
        <div className="space-y-3">
                <ChatRepoTasksProps/>
                <KnowTheRepoProps/>
                <CoderProps/>
                <FluffyResponseProps/>
                <LanguageOptionsProps/>
        </div>
     );
}
 
export default UserPreferencesChat;