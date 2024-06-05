import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserMessageComponentProps {
    message: string;
    tags: string[];
}

interface CleanMessage {
    title: string;
    text: string;
}



const UserMessageComponent: React.FC<UserMessageComponentProps> = ({ message, tags }) => {
    const parseMessage = (message: string): CleanMessage[] => {
        // Define regex patterns
        const patterns: { [key: string]: RegExp } = {
            "User Query": /### User Query ###\s*(.*?)\s*(?=###|$)/gs,
            "Code Snippet": /### Code snippet used by user ###\s*(.*?)\s*(?=###|$)/gs,
            "Error Description": /### Error Description ###\s*(.*?)\s*(?=###|$)/gs,
            "Edge-cases and Conditions": /### Edge-cases and Conditions that need to be addressed in the code ###\s*(.*?)\s*(?=###|$)/gs,
            "Expected Outcome": /### Expected Outcome ###\s*(.*?)\s*(?=###|$)/gs,
            "Actual Outcome / Error": /### Actual Outcome \/ Error ###\s*(.*?)\s*(?=###|$)/gs,
        };

        // Extract sections based on patterns
        const cleanMessage: CleanMessage[] = [];

        Object.entries(patterns).forEach(([title, regex]) => {
            const matches = Array.from(message.matchAll(regex));
            matches.forEach(match => {
                cleanMessage.push({ title, text: match[1].trim() });
            });
        });

        return cleanMessage;
    };

    // Parse the provided message
    const parsedMessages = parseMessage(message);

    return (
        <div className="bg-card/75 text-card-foreground mb-1 shadow-lg rounded-lg p-4 mt-4 border">
            <div className="flex flex-col">
                {parsedMessages.map((item, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                        <div aria-labelledby="code-snippet-title" className="bg-card-foreground/10 border rounded-lg p-4 mb-6">
                            <p className="font-mono text-sm">{item.text.slice(2)}</p>
                            {/* <Button className="mt-2" variant="link">Show More</Button> */}
                        </div>
                    </div>
                ))}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge key={index} className="bg-tagsbg text-white px-3 py-1 rounded-md">{tag}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserMessageComponent;