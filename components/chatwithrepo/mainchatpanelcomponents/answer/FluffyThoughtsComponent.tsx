import { AccordionPlain } from "@/components/ui/accordianplain";
import EdgeCases from "./dependantComponents/FluffyThoughts/edgeCasesSection";
import ChatSection from "./dependantComponents/FluffyThoughts/chatSection";
import { FluffyThoughts, GenerationStates } from "@/lib/typesserver";
import { FluffyLoader } from "./dependantComponents/fluffy-loader";

const sections = [
  {
    sectionName: "Your Similar Queries",
    sectionKey: "user",
    chatsList: [
      {
        title: "User Chat 1",
        description: "Description for user chat 1",
        creatorEmail: "user1@example.com",
        creatorName: "User One",
        tags: ["tag1", "tag2"],
        section: "user",
      },
      {
        title: "User Chat 2",
        description: "Description for user chat 2",
        creatorEmail: "user2@example.com",
        creatorName: "User Two",
        tags: ["tag3", "tag4"],
        section: "user",
      },
    ],
  },
  {
    sectionName: "Team's Similar Queries",
    sectionKey: "org",
    chatsList: [
      {
        title: "Team Chat 1",
        description: "Description for team chat 1",
        creatorEmail: "team1@example.com",
        creatorName: "Team Member One",
        tags: ["tag5", "tag6"],
        section: "org",
      },
      {
        title: "Team Chat 2",
        description: "Description for team chat 2",
        creatorEmail: "team2@example.com",
        creatorName: "Team Member Two",
        tags: ["tag7", "tag8"],
        section: "org",
      },
      {
        title: "Team Chat 3",
        description: "Description for team chat 3",
        creatorEmail: "team3@example.com",
        creatorName: "Team Member Three",
        tags: ["tag9", "tag10"],
        section: "org",
      },
      {
        title: "Team Chat 4",
        description: "Description for team chat 4",
        creatorEmail: "team4@example.com",
        creatorName: "Team Member Four",
        tags: ["tag11", "tag12"],
        section: "org",
      },
    ],
  },
  {
    sectionName: "Other Users' Similar Queries",
    sectionKey: "community",
    chatsList: [
      {
        title: "Community Chat 1",
        description: "Description for community chat 1",
        creatorEmail: "community1@example.com",
        creatorName: "Community Member One",
        tags: ["tag13", "tag14"],
        section: "community",
      },
      {
        title: "Community Chat 2",
        description: "Description for community chat 2",
        creatorEmail: "community2@example.com",
        creatorName: "Community Member Two",
        tags: ["tag15", "tag16"],
        section: "community",
      },
      {
        title: "Community Chat 3",
        description: "Description for community chat 3",
        creatorEmail: "community3@example.com",
        creatorName: "Community Member Three",
        tags: ["tag17", "tag18"],
        section: "community",
      },
      {
        title: "Community Chat 4",
        description: "Description for community chat 4",
        creatorEmail: "community4@example.com",
        creatorName: "Community Member Four",
        tags: ["tag19", "tag20"],
        section: "community",
      },
      {
        title: "Community Chat 5",
        description: "Description for community chat 5",
        creatorEmail: "community5@example.com",
        creatorName: "Community Member Five",
        tags: ["tag21", "tag22"],
        section: "community",
      },
    ],
  },
];

interface FluffyThoughtsComponentProps {
  fluffyThoughts?: FluffyThoughts;
  fluffyStatus: GenerationStates;
}

export default function FluffyThoughtsComponent({
  fluffyThoughts,
  fluffyStatus,
}: FluffyThoughtsComponentProps) {
  const QueuedSkeleton = () => (
    <div className="items-center justify-center">
      <FluffyLoader loaderMessage="Fluffy is evaluating the response to assess if there are any unaddressed issues, edge cases or important points to note, please wait..." />
    </div>
  );

  const StatusSkeleton = (message: string) => (
      <div className="items-center justify-center">
        <div className="h-full flex flex-col gap-y-2 items-center justify-center mt-4">
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
  );


  const renderFluffyThoughts = () => {
    switch (fluffyStatus.fluffyThoughtsFetched) {
      case "queued":
        return StatusSkeleton("Once the answer is generated, Fluffy will evaluate the response to assess if there are any unaddressed issues, edge cases, or important points to note!");
      case "inprogress":
        return <QueuedSkeleton />;
      case "done":
        if (fluffyThoughts) {
          if (fluffyThoughts.edgeCases && fluffyThoughts.edgeCases.length === 0) {
            return (
              <div className="flex items-center justify-between rounded-md bg-white px-2 py-2 shadow-sm dark:bg-gray-800">
                <div className="flex items-center">
                  <p className="text-sm font-medium">
                    {fluffyThoughts.fluffyFeedback}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <EdgeCases
                  score={fluffyThoughts.score}
                  threshold={75}
                  edgeCases={fluffyThoughts.edgeCases}
                />
              </div>
            );
          }
        } else {
          return <QueuedSkeleton />;
        }
      case "failed":
        return StatusSkeleton("There was an error fetching Fluffy Thoughts");
      default:
        return <p></p>;
    }
  };
  return (
    <div
      key="1"
      className="flex h-full w-full max-w-[320px] flex-col bg-card/75 text-card-foreground mb-1 shadow-lg rounded-lg p-4 mt-4 border"
    >
      <div className="flex h-12 items-center border-b border-gray-200 px-3 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Fluffy Thoughts</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-4">
          {renderFluffyThoughts()}
          <div></div>
          {/* <section>
            <AccordionPlain type="single" collapsible className="w-full">
              {sections.map((section) => (
                <ChatSection
                  key={section.sectionName}
                  sectionName={section.sectionName}
                  chats={section.chatsList}
                  sectionKey={section.sectionKey}
                />
              ))}
            </AccordionPlain>
          </section> */}
        </div>
      </div>
    </div>
  );
}
