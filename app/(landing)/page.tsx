import LandingContent from "@/components/pageLanding/landing-content";
import LandingFeatures from "@/components/pageLanding/landing-features";
import { LandingFeaturesNew } from "@/components/pageLanding/landing-features-2";
import { LandingFeaturesChatLayout } from "@/components/pageLanding/landing-features-chat-layout";
import { Footer } from "@/components/pageLanding/landing-footer";
import LandingHero from "@/components/pageLanding/landing-hero";
import { LandingNavbar} from "@/components/pageLanding/landing-navbar";
import { Separator } from "@/components/ui/separator";

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero />
            <Separator />
            <LandingFeaturesChatLayout />
            <Separator />
            <LandingFeaturesNew />
            <Separator />
            <Footer />
        </div>
    );
}

export default LandingPage;