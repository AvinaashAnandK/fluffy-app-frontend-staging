import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PricingCardModal = () => {
    return ( 
        <Card className="w-full">
        <CardHeader>
          <CardTitle>Individual</CardTitle>
          <CardDescription>Best for personal use and hobby projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">
            $0
            <span className="text-lg font-normal">per month</span>
          </p>
          <Button className="mt-4 w-full">Create a free account</Button>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="material-icons text-green-500">check</span>
              Unlimited public/private repositories
            </li>
            <li className="flex items-center">
              <span className="material-icons text-green-500">check</span>
              Automatic security and version updates
            </li>
            <li className="flex items-center">
              <span className="material-icons text-green-500">check</span>
              2,000 CI/CD minutes/month
            </li>
            <li className="flex items-center">
              <span className="material-icons text-green-500">check</span>
              500MB of Packages storage
            </li>
            <li className="flex items-center">
              <span className="material-icons text-green-500">check</span>
              Community support
            </li>
          </ul>
        </CardContent>
      </Card>
     );
}
 
export default PricingCardModal;