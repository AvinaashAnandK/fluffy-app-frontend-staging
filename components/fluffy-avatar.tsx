import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";

const FluffyAvatar = () => {    
    return ( 
<Avatar className="h-8 w-8">
    <AvatarImage src="/fluffy.png"/>
    <AvatarFallback>
        User
    </AvatarFallback>
</Avatar>
     );
}

export default FluffyAvatar;