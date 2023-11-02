"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
    return ( 
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4" />
            <Input 
                className="pl-10 bg-primary/10"
                placeholder="Search..."
            />
        </div>
     );
}
 
export default SearchInput;