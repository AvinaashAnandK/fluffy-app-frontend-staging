import LandingContent from "@/components/landing-content";
import LandingFeatures from "@/components/landing-features";
import LandingHero from "@/components/landing-hero";
import { LandingNavbar} from "@/components/landing-navbar";

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