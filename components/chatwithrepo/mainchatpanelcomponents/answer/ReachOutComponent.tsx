import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CollegueComponent = () => {
    return (
        <Card className="max-w-md bg-card p-6 rounded-lg">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage alt="Daniel" src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">Your colleague Richard can help you out further...</p>
                    <div className="mt-2 flex gap-2">
                        <Button size="sm">
                            <SlackIcon className="mr-2 h-4 w-4" />
                            Connect on Slack
                        </Button>
                        <Button size="sm" variant="outline">
                            <DiscIcon className="mr-2 h-4 w-4" />
                            Connect on Discord
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const CommunityUserComponent = () => {
    return (
        <Card className="max-w-md bg-card p-6 rounded-lg">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage alt="Daniel" src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">Do you want to talk to Daniel on this issue?</p>
                    <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">
                            <DiscIcon className="mr-2 h-4 w-4" />
                            Connect on Discord
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

function DiscIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function SlackIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="3" height="8" x="13" y="2" rx="1.5" />
            <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
            <rect width="3" height="8" x="8" y="14" rx="1.5" />
            <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
            <rect width="8" height="3" x="14" y="13" rx="1.5" />
            <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
            <rect width="8" height="3" x="2" y="8" rx="1.5" />
            <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
        </svg>
    );
}

const ReachOutComponent = () => {
    return (
        <div className="space-y-4">
            <CollegueComponent />
            <CommunityUserComponent />
        </div>
    );
};

export default ReachOutComponent;
