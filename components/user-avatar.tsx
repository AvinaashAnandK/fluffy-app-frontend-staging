import { useUser } from "@clerk/nextjs";

import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
    const { user } = useUser();
      
    return ( 
<Avatar className="h-8 w-8">
    <AvatarImage src={user?.imageUrl}/>
    <AvatarFallback>
        User
    </AvatarFallback>
</Avatar>
     );
}

export default UserAvatar;