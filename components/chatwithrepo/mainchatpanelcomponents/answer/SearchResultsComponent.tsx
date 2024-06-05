// 1. Import the 'useState' and 'useEffect' hooks from React
import { useState, useEffect } from 'react';
import { DownloadSimple } from "@phosphor-icons/react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import SourceItem from './dependantComponents/source-item';
import { FluffyLoader } from './dependantComponents/fluffy-loader';
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from '@tabler/icons-react';
import { RiJavascriptLine, RiCodeSSlashFill } from "react-icons/ri";
import { TbBrandPython, TbBrandTypescript } from "react-icons/tb";
import { BsMarkdown } from "react-icons/bs";
import { IoGlobeOutline } from "react-icons/io5";

import { BentoGrid, BentoGridItem, BentoGridItemDownloads } from '@/components/ui/bento-grid';
import { GrResources } from 'react-icons/gr';

// 2. Define the 'SearchResult' interface with properties for 'favicon', 'link', and 'title'
export interface SearchResult {
    favicon: string;
    link: string;
    title: string;
}

interface RetreivedSources {
    download_sources: DownloadSource[];
    documentation_sources_list: DocumentationSource[];
    code_sources: CodeSource[];
    prompt: RagPrompt;
}

interface DownloadSource {
    download_instruction: string;
    download_type: string;
    download_description: string;
    download_source: string;
}
  
  interface DocumentationSource {
    doc_type: string;
    doc_filename: string;
    doc_path: string;
    doc_source_directory: string;
}
  
  interface CodeSource {
    file_path: string;
    dependancy_count: number;
}

interface RagPrompt {
    instructions: string;
    instruction_reiterate: string;
    user_query: string;
    task: string;
    tags: string[]; 
    token_lengths: TokenLengths;
    downloads?: string;
    documentation?: string;
    code?: string;
  }

interface TokenLengths {
    instructions?: number;
    downloads?: number;
    documentation?: number;
    code?: number;
    instruction_reiterate?: number;
    user_query?: number;
  }

// 3. Define the 'SearchResultsComponentProps' interface with a 'searchResults' property of type 'SearchResult[]'
export interface SearchResultsComponentProps {
    searchResults: SearchResult[];
}

// 4. Define the 'SearchResultsComponent' functional component that takes 'searchResults' as a prop
const SearchResultsComponent = ({ searchResults }: { searchResults: RetreivedSources }) => {
    const [downloadSources, setDownloadSources] = useState<DownloadSource[]>([]);
    const [documentationSources, setDocumentationSources] = useState<DocumentationSource[]>([]);
    const [codeSources, setCodeSources] = useState<CodeSource[]>([]);

    const [downloadSourcesLength, setDownloadSourcesLength] = useState<number>(0);
    const [documentationSourcesLength, setDocumentationSourcesLength] = useState<number>(0);
    const [codeSourcesLength, setCodeSourcesLength] = useState<number>(0);

    const getIconForCodeFile = (filePath: string) => {
        const codeLogos = {
            js: <RiJavascriptLine className="h-4 w-4 text-orange-500" />,
            ts: <TbBrandTypescript className="h-4 w-4 text-amber-500" />,
            py: <TbBrandPython className="h-4 w-4 text-blue-500" />,
            other: <RiCodeSSlashFill className="h-4 w-4 text-cyan-500" />
        };
        if (filePath.endsWith('js') || filePath.endsWith('jsx')) {
            return codeLogos.js;
        } else if (filePath.endsWith('ts') || filePath.endsWith('tsx')) {
            return codeLogos.ts;
        } else if (filePath.endsWith('py') || filePath.endsWith('ipynb')) {
            return codeLogos.py;
        } else {
            return codeLogos.other;
        }
    };

    const getIconForDoc = (fileName: string) => {
        const docLogos = {
            web: <IoGlobeOutline className="h-4 w-4 text-orange-500" />,
            file: <BsMarkdown className="h-4 w-4 text-cyan-500" />
        };
        if (fileName.startsWith('Web')) {
            return docLogos.web;
        } else {
            return docLogos.file;
        }
    };

    const getDescpForDoc = (item: DocumentationSource) => {
        if (item.doc_type === 'Web') {
            const protocolSplit = item.doc_filename.split('//');
            if (protocolSplit.length > 1) {
                const pathSplit = protocolSplit[1].split('/');
                if (pathSplit.length > 0) {
                    return pathSplit[0]; 
                }
            }
        } else {
            const protocolSplit = item.doc_filename.split('code/');
            if (protocolSplit.length > 1) {
                const pathSplit = protocolSplit[1].split('/');
                if (pathSplit.length > 0) {
                    return pathSplit[0]; 
                }
            }
        }
        return "Path not found";
    };

    const getTitleForDoc = (item: DocumentationSource) => {
        if (item.doc_type === 'Web') {
            const protocolSplit = item.doc_filename.split('//');
            if (protocolSplit.length > 1) {
                const pathSplit = protocolSplit[1].split('/');
                if (pathSplit.length > 0) {
                    return pathSplit[0]; 
                }
            }
        }
        return item.doc_filename;
    };
    
    
    useEffect(() => {
        if (searchResults.download_sources) {
            setDownloadSources(searchResults.download_sources);
            setDownloadSourcesLength(searchResults.download_sources.length);
            console.log(searchResults.download_sources.length);
        } else {
            setDownloadSources([]);
            setDownloadSourcesLength(0);
        }
    
        if (searchResults.documentation_sources_list) {
            const uniqueDocumentationSources = Array.from(new Map(searchResults.documentation_sources_list.map(item => [item.doc_filename, item])).values());
        
            setDocumentationSources(uniqueDocumentationSources);
            setDocumentationSourcesLength(uniqueDocumentationSources.length);
            console.log(uniqueDocumentationSources.length);
        } else {
            setDocumentationSources([]);
            setDocumentationSourcesLength(0);
        }
    
        if (searchResults.code_sources) {
            setCodeSources(searchResults.code_sources);
            setCodeSourcesLength(searchResults.code_sources.length);
            console.log(searchResults.code_sources.length);
        } else {
            setCodeSources([]);
            setCodeSourcesLength(0);
        }
    }, [searchResults]);
    
 
    const SearchResultsSkeleton = () => (
        <div className='items-center justify-center'>
            <FluffyLoader/>
        </div>
    );

    const DownloadSourcesComponent = () => (
        <>
            {downloadSourcesLength > 0 && (
                <div className='flex'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='text-gradhighlight1 hover:text-gradhighlight1/85'>
                                <DownloadSimple className='w-5 h-5 mr-2 text-gradhighlight1'/>
                                Set-up & Other Links
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Set-up & Downloads</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                            
                                <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[6rem] max-h-[32rem] md:grid-cols-1">
                                {downloadSources.map((item, i) => (
                                    <BentoGridItemDownloads
                                        key={i}
                                        title={item.download_type}
                                        description={item.download_description}
                                        icon={<BsMarkdown className="h-4 w-4 text-cyan-500" />}
                                        className={""} 
                                        link={item.download_instruction}
                                    />
                                    )
                                
                                )
                                }
                                </BentoGrid>
                            
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>)
            }
        </>
    );

    const CodeSourcesComponent = () => (
        <>
        {codeSourcesLength > 0 && (
                <div className='flex'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='text-gradhighlight3 hover:text-gradhighlight3/85'>
                                <GrResources className='w-5 h-5 mr-2 text-gradhighlight3'/>
                                Code Sources
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Code Sources</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                {/* {downloadSources.map((downloadSource, index) => (
                                    <div className='w-full'>
                                    <SourceItem key={index} source={downloadSource} index={index} />
                                    </div>
                                ))} */}
                                <div>
                                <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[6rem] max-h-[32rem]">
                                {codeSources.map((item, i) => {
                                    let applyMinHeightClass = "";
                                    const currentItemTitleLength = item.file_path.length;
                                    const nextItemTitleLength = i + 1 < codeSources.length ? codeSources[i + 1].file_path.length : 0;
                                    const previousItemTitleLength = i - 1 >= 0 ? codeSources[i - 1].file_path.length : 0;

                                    // For odd indices, check current and next item (if exists). For the first item, it will only check its own.
                                    if (i % 2 !== 0) {
                                    if (currentItemTitleLength > 24 ||  previousItemTitleLength > 24) {
                                        applyMinHeightClass = "min-h-[4.5rem]";
                                    }
                                    } 
                                    // For even indices, check current and previous item. For the second item, this includes checking the first item.
                                    else {
                                    if (currentItemTitleLength > 24 || nextItemTitleLength > 24) {
                                        applyMinHeightClass = "min-h-[4.5rem]";
                                    }
                                    }

                                    return (
                                    <BentoGridItem
                                        key={i}
                                        title={item.file_path.split('/').pop() || item.file_path}
                                        description={`Depends on ${item.dependancy_count} code files`}
                                        icon={getIconForCodeFile(item.file_path)}
                                        className={applyMinHeightClass} // Apply the class conditionally
                                    />
                                    );
                                })}
                                </BentoGrid>
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>)}
        </>
    );

    const DocumentationSourcesComponent = () => (
        <>
           {documentationSourcesLength > 0 && (
                <div className='flex'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='text-gradhighlight1 hover:text-gradhighlight1/85'>
                                <DownloadSimple className='w-5 h-5 mr-2 text-gradhighlight1'/>
                                Doc sources
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Documentation Files</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                {/* {downloadSources.map((downloadSource, index) => (
                                    <div className='w-full'>
                                    <SourceItem key={index} source={downloadSource} index={index} />
                                    </div>
                                ))} */}
                                <div>
                                    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[6rem] max-h-[32rem]">
                                    {documentationSources.map((item, i) => {
                                        let applyMinHeightClass = "";
                                        const currentItemTitleLength = getTitleForDoc(item).length;
                                        const nextItemTitleLength = i + 1 < documentationSources.length ? getTitleForDoc(documentationSources[i + 1]).length : 0;
                                        const previousItemTitleLength = i - 1 >= 0 ? getTitleForDoc(documentationSources[i - 1]).length : 0;

                                        // For odd indices, check current and next item (if exists)
                                        if (i % 2 !== 0) {
                                        if (currentItemTitleLength > 24 || previousItemTitleLength > 24) {
                                            applyMinHeightClass = "min-h-[4.5rem]";
                                        }
                                        } 
                                        // For even indices, check current and previous item
                                        else {
                                        if (currentItemTitleLength > 24 || nextItemTitleLength > 24) {
                                            applyMinHeightClass = "min-h-[4.5rem]";
                                        }
                                        }

                                        return (
                                        <BentoGridItem
                                            key={i}
                                            title={getTitleForDoc(item)}
                                            description={getDescpForDoc(item)}
                                            icon={getIconForDoc(item.doc_type)}
                                            className={applyMinHeightClass} // Apply the class conditionally
                                        />
                                        );
                                    })}
                                    </BentoGrid>
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
            </div>)}
        </>
    );

    // 11. Render the 'SearchResultsComponent'
    return (
        <div className="bg-card/75 text-card-foreground mb-1 shadow-lg rounded-lg border p-2 mt-2">
            <div className="flex flex-wrap">
                {downloadSourcesLength === 0 && documentationSourcesLength === 0 && codeSourcesLength === 0 ? (
                    // 12. Render the 'SearchResultsSkeleton' if there are no search results
                    <div className="p-2 w-full">
                        <div className="flex items-center justify-center">
                            <SearchResultsSkeleton />
                        </div>
                    </div>
                ) : (
                        <div className="p-2 w-full">
                            <div className="flex items-center space-x-2 bg-card/50 p-1 rounded-lg h-full">
                                {/* <DownloadSourcesComponent/> */}
                                <CodeSourcesComponent/>
                                <DocumentationSourcesComponent/>
                            </div>
                        </div>
                    )
                }
                {/* 14. Render a button to toggle the expansion of search results */}
                {/* <div className="w-full sm:w-full md:w-1/4 p-2">
                    <div
                        onClick={toggleExpansion}
                        className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer h-12 justify-center"
                    >
                        {!isExpanded ? (
                            <>
                                {searchResults.slice(3).map((result, index) => (
                                    <img key={index} src={result.favicon} alt="favicon" className="w-4 h-4" />
                                ))}
                                <span className="text-xs font-semibold">View more</span>
                            </>
                        ) : (
                            <span className="text-sm font-semibold">Show Less</span>
                        )}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SearchResultsComponent;