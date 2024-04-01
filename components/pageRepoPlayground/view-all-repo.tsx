"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react";

export function ViewRepoList() {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigate = (url: string) => {
    return router.push(url);
  }
    return (
        <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-cyan-200">View All Repos</CardTitle>
          <CardDescription className="text-base pt-2 text-slate-100">
          Peek into all the indexed OS repos
          </CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center gap-4">
          <Avatar className="flex justify-center items-center h-16 w-16 rounded-none">
            <AvatarImage src="/repolist.png" className="" />
          </Avatar>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-md" variant="plainpurple" onClick={() => onNavigate("/playground/allrepo")}>
          <Search className="h-3.5 w-3.5 mr-2" />
            View Repo List
          </Button>
        </CardFooter>
      </Card>
    )
  }
