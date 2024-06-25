import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddRepoModal } from "@/hooks/zustand-store-fluffy";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

import { useState } from "react";

const AddRepoModal = () => {
    const { toast } = useToast()
    const { isOpen, onClose } = useAddRepoModal();
    const [githubUrl, setGithubUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(true); // Assume URL is valid initially

    // Function to validate GitHub URL
    const isValidGithubUrl = (url: string) => {
        const regex = /^(https:\/\/github\.com\/[\w-]+\/[\w-.]+)$/; // Adjust regex as needed
        return regex.test(url);
    };

    // Function to handle URL change
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setGithubUrl(url);

        // Only validate the URL if it's more than 3 characters
        if (url.length > 3) {
            setIsValidUrl(isValidGithubUrl(url)); // Validate URL and update state
        } else {
            setIsValidUrl(true); // Consider short URLs as tentatively valid
        }
    };

    const handleIngestion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Ensure URL is valid before proceeding
        if (!isValidGithubUrl(githubUrl)) {
            setIsValidUrl(false); // Update state to reflect invalid URL
            return; // Exit the function to prevent API call
        }

        try {
            const response = await fetch('/api/addrepo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    github_url: githubUrl,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // console.log('Ingestion started successfully:', data);
                onClose(); // Close the modal on success
                toast({
                    description: "Repo ingestion started successfully. \n 📧 You will receive an email once the process is completed.",
                    variant: 'default', // Assuming your toast implementation supports a 'status' prop
                });
            } else {
                console.error('Ingestion failed:', data.error);
                toast({
                    description: "Repo ingestion failed, try again.",
                    variant: 'destructive', // Assuming your toast implementation supports a 'status' prop
                });
            }
        } catch (error) {
            toast({
                description: `Repo ingestion failed - error occurred: ${error}`,
                variant: 'destructive', // Assuming your toast implementation supports a 'status' prop
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Repo</DialogTitle>
                    <DialogDescription>
                        Enter the URL of the repo you want to ingest.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleIngestion} className="space-y-2">
                    <Label htmlFor="github-url" className="sr-only">
                        GitHub URL
                    </Label>
                    <Input
                        className="w-full"
                        id="github-url"
                        placeholder="E.g. https://github.com/huggingface/transformers.git"
                        type="text"
                        value={githubUrl}
                        onChange={handleUrlChange}
                    />
                    {!isValidUrl && githubUrl.length > 3 && <p className="text-sm text-red-500">Invalid GitHub URL</p>} {/* Show error message conditionally */}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="plainpurple" disabled={!isValidUrl || githubUrl.length < 3}>Start Ingestion</Button> {/* Disable button conditionally */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRepoModal;
