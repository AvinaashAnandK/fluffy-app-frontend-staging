import { Dialog, DialogContent, DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/zustand-store-fluffy";


const AddRepoModal = () => {
    const { isOpen, onClose } = useProModal();

    return ( 
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-customco1">
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        Add a repo
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
     );
}
 
export default AddRepoModal;