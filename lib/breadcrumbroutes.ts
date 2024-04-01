import { ScanSearch, GalleryVerticalEnd,Settings,MessageCircle,PackageOpen } from "lucide-react";

export const bcrouteslist = [
    {
        icon:MessageCircle,
        key:"dashboard",
        href:"/dashboard",
        label:"Ask Fluffy!",
        pro: false
    },
    {
        icon:PackageOpen,
        key:"playground",
        href:"/playground",
        label:"Repo Playground",
        pro: false
    },
    {
        key:"allrepo",
        href:"/playground/allrepo",
        label:"Repo List",
        pro: false
    },
    {
        key:"repochat",
        href:"/playground/repochat",
        label:"Chat",
        pro: false
    },
    {
        key:"addrepo",
        href:"/dashboard",
        label:"Add Repo",
        pro: false
    },
    {
        icon:ScanSearch,
        href:"/dashboard/explore",
        key:"explore",
        label:"Explore",
        pro: true
    },
    // {
    //     icon:GalleryVerticalEnd,
    //     href:"/dashboard/history",
    //     key:"history",
    //     label:"History",
    //     pro: true
    // },
    {
        icon:Settings,
        href:"/dashboard/setting",
        key:"setting",
        label:"Setting",
        pro: false
    },
];