"use client";
import { useEffect, useState } from 'react';
import { PiDownloadSimpleDuotone } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import SourceItem from './source-item';
import { Message } from "ai/react";

export interface ChatMessageProps {
  message: Message;
}

export default function SourceBubble({ message }: ChatMessageProps) {
  const message_text = message.content;
  const [codeSources] = useState([
    { dependancy_count: '8', file_path: 'src/transformers/models/seamless_m4t/modeling_seamless_m4t.py' },
    { dependancy_count: '4', file_path: 'src/transformers/models/univnet/feature_extraction_univnet.py' },
    { dependancy_count: '6', file_path: 'src/transformers/models/data2vec/modeling_data2vec_audio.py' },
    { dependancy_count: '3', file_path: 'src/transformers/models/encodec/feature_extraction_encodec.py' },
    { dependancy_count: '5', file_path: 'src/transformers/models/seamless_m4t/feature_extraction_seamless_m4t.py' }
  ]);
  const [documentationSourcesList] = useState([
    { doc_filename: 'seamless_m4t_v2.md', doc_path: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/code/docs/source/en/model_doc/seamless_m4t_v2.md', doc_source_directory: 'docs/source/en/model_doc/seamless_m4t_v2.md', doc_type: 'File' },
    { doc_filename: 'https://huggingface.co/datasets/transformersbook/codeparrot/viewer/default/train?p=1', doc_path: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/dependencies/documentation/89c076abce79e6cbf94e4a17f531fde44d8ccb0b3cbf0de981db8947630815e7/huggingface.co/datasets/transformersbook/codeparrot/viewer/default/train?p=1', doc_source_directory: 'https://huggingface.co/datasets/transformersbook/codeparrot', doc_type: 'Web' },
    { doc_filename: 'seamless_m4t.md', doc_path: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/code/docs/source/en/model_doc/seamless_m4t.md', doc_source_directory: 'docs/source/en/model_doc/seamless_m4t.md', doc_type: 'File' },
  ]);
  const [downloadSources] = useState([
    { download_description: 'Link to the deprecated `bertabs` instructions.', download_instruction: 'https://github.com/huggingface/transformers/blob/main/examples/research_projects/bertabs/README.md', download_source: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/code/examples/pytorch/summarization/README.md', download_type: 'URL' },
    { download_description: 'The TensorRT required for the implementation.', download_instruction: 'https://developer.nvidia.com/tensorrt', download_source: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/code/examples/research_projects/quantization-qdqbert/README.md', download_type: 'URL' },
    { download_description: 'Python script for pre-training a ViT from scratch for masked image modeling on the cifar10 dataset.', download_instruction: '!python run_mim.py ...', download_source: '/home/azureuser/fluffychat/repo/data/transformers_cf909fcdfc721eccb8abb5a636764a91/code/examples/pytorch/image-pretraining/README.md', download_type: 'Script' },
  ]);

  const sources = [...codeSources, ...documentationSourcesList];
  const docAndCodeSourcesLength = sources.length;
  const downloadsLength = downloadSources.length;

//   console.log(sources)

    return (
        <div className='flex space-x-4 ml-4 mb-4'>
            {downloadsLength > 0 && (
                <div className='flex'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='text-gradhighlight1 hover:text-gradhighlight1/85'>
                                <PiDownloadSimpleDuotone className='w-5 h-5 mr-2 text-gradhighlight1'/>
                                Repo requires set-up
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Set-up & Downloads</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                {downloadSources.map((downloadSource, index) => (
                                    <SourceItem key={index} source={downloadSource} index={index} />
                                ))}
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
            {docAndCodeSourcesLength > 0 && (
                <div className='flex'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="outline" className='text-gradhighlight3 hover:text-gradhighlight3/85'>
                                <GrResources className='w-5 h-5 mr-2 text-gradhighlight3'/>
                                Sources
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sources</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription className='space-y-3'>
                                {sources.map((source, index) => (
                                    <SourceItem key={index} source={source} index={index} />
                                ))}
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );
}
