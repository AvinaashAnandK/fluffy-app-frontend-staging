import { Badge } from "@/components/ui/badge";

interface UserMessageComponentProps {
    message: string;
}

const UserMessageComponent: React.FC<UserMessageComponentProps> = ({ message }) => {
    return (
        <div className="bg-card/75 text-card-foreground mb-1 shadow-lg rounded-lg p-4 mt-4 border">
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-2">{message}</h2>
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-tagsbg text-tagstext/35 px-3 py-1 rounded-md">Badge 1</Badge>
                    <Badge className="bg-tagsbg text-tagstext/35 px-3 py-1 rounded-md">Badge 1</Badge>
                    <Badge className="bg-tagsbg text-tagstext/35 px-3 py-1 rounded-md">Badge 1</Badge>
                    <Badge className="bg-tagsbg text-tagstext/35 px-3 py-1 rounded-md">Badge 1</Badge>
                    <Badge className="bg-tagsbg text-tagstext/35 px-3 py-1 rounded-md">Badge 1</Badge>
                </div>
            </div>
        </div>
    );
};

export default UserMessageComponent;