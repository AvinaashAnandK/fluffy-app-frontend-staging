import LandingContent from "@/components/pageLanding/landing-content";
import LandingFeatures from "@/components/pageLanding/landing-features";
import LandingHero from "@/components/pageLanding/landing-hero";
import { LandingNavbar} from "@/components/pageLanding/landing-navbar";

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero />
            <LandingFeatures />
        </div>
    );
}

export default LandingPage;