import React from "react";
import { Button } from "@/components/ui/button";

interface EdgeCasesProps {
  score: number;
  threshold: number;
  edgeCases: string[];
}

const EdgeCases: React.FC<EdgeCasesProps> = ({
  score,
  threshold,
  edgeCases,
}) => {

  const issuesToDisplay = edgeCases || [];

  return (
    <div className="text-white">
      <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        {score < threshold
          ? "Unaddressed Issues / Edge Cases in answer"
          : "Points to note"}
      </h3>
      <div className="space-y-2">
        {issuesToDisplay.map((issue, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md bg-white px-2 py-2 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-center">
              <div className="flex text-gray-400 text-xs items-center justify-center rounded-full bg-muted border-gray-400 border relative h-5 w-5 shrink-0 overflow-hidden mr-2">
                {index + 1}
              </div>
              <p className="text-sm font-medium">{issue}</p>
            </div>
          </div>
        ))}
      </div>
      {score < threshold && (
        <div className="flex justify-end items-center space-x-4">
          <Button className="mt-4 text-sm" variant="destructive" size="lg">
            Address them
          </Button>
        </div>
      )}
    </div>
  );
};

export default EdgeCases;
