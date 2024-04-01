import React, { FC } from 'react';

interface CodeSource {
  dependancy_count: string;
  file_path: string;
}

interface DocumentationSource {
  doc_filename: string;
  doc_path: string;
  doc_source_directory: string;
  doc_type: string;
}

interface DownloadSource {
  download_description: string;
  download_instruction: string;
  download_source: string;
  download_type: string;
}

type SourceType = CodeSource | DocumentationSource | DownloadSource;


interface SourceItemProps {
  source: SourceType;
  index: number;
}


const SourceItem: FC<SourceItemProps> = ({ source, index }) => {
  
  let name: string, path: string, description: string | undefined;
  if ('file_path' in source) {
    // It's a CodeSource
    name = `Code Source #${index + 1}`;
    path = source.file_path;
    description = `Dependency Count: ${source.dependancy_count}`;
  } else if ('doc_path' in source) {
    // It's a DocumentationSource
    name = source.doc_source_directory;
    path = source.doc_path;
    description = `Type: ${source.doc_type}`;
  } else {
    // It's a DownloadSource
    name = `Download Source #${index + 1}`;
    path = source.download_source;
    description = source.download_description;
  }

  return (
    <div className="relative w-96 text-xs py-3 px-3 rounded-lg flex flex-col gap-6 border-gray-200 rounded-lg">
      <div className="font-medium text-zinc-950 text-ellipsis overflow-hidden whitespace-nowrap break-words">
        {name}
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex-1 overflow-hidden">
          <div className="text-ellipsis whitespace-nowrap break-all text-zinc-400 overflow-hidden w-full">
            {path}
          </div>
          {description && (
            <div className="text-zinc-500 mt-1">
              {description}
            </div>
          )}
        </div>
        <div className="flex-none flex items-center">
          {/* Placeholder SVG icon */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10c0 1.1.9 2 2 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SourceItem;