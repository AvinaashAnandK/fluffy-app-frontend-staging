import { Categories } from "@/components/pageExploreRepos/categories";
import ExploreList from "@/components/pageExploreRepos/explore-list";
import ExploreSearchInput from "@/components/pageExploreRepos/explore-search-input";
import prismadb from "@/lib/prismadb";

interface ExplorePageProps {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

// const DashboardPage = async ({
//   searchParams
// }: ExplorePageProps) => {
//   const { categoryId, name } = searchParams; 
//   const categories = await prismadb.category.findMany();
//   return (
//     <div className="h-full p-4 space-y-2">
//       <ExploreSearchInput />
//       <Categories data={categories} />
//       <ExploreList categoryId={categoryId} name={name} /> 
//     </div>
//   );
// }

const DashboardPage = async () => {
  return (
    <div className="h-full p-4 space-y-2">
        Building explore page!
    </div>
  );
}


export default DashboardPage;