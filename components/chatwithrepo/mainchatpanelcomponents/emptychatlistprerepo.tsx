"use client";

const EmptyChatListPreRepoSelection = () => {
    return ( 
        <div className="mx-auto max-w-2xl px-4 pb-400">
        <div className="rounded-lg border bg-background p-8">
          <h1 className="mb-2 text-lg font-semibold">
            {"Welcome to Chat with a repo!"}
          </h1>
          <p className="mb-2 leading-normal text-muted-foreground">
            Select one using the dropdown above to start chatting
          </p>
          <p className="leading-normal text-muted-foreground">
            Find the repo, set your preferences using the knobs on the left and get going. 
          </p>
        </div>
      </div>
    
    );
}
 
export default EmptyChatListPreRepoSelection;