import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/ui/external-link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto overflow-auto pb-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const cardHeight = className === "min-h-[4.5rem]" ? "min-h-[7.5rem]" : "min-h-[6rem]";

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 ",
        cardHeight
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
      <div className={cn(
        className
      )}>
      {icon && <div className="flex items-center">{icon}</div>}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 break-all line-clamp-2">
        {title}
        </div>
      </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mt-auto">
          {description}
        </div>
      </div>
    </div>
  );
};

export const BentoGridItemDownloads = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link: string;
}) => {
  const cardHeight = className === "min-h-[4.5rem]" ? "min-h-[7.5rem]" : "min-h-[6rem]";

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 ",
        cardHeight
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
      <ExternalLink href={link}>
          <div className={cn(className, "flex items-center space-x-2")}>
            {icon}
            <span className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mt-auto">
              {title}
            </span>
          </div>
        </ExternalLink>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 break-all line-clamp-2">
          {description}
        </div>
      </div>
    </div>
  );
};