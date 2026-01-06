import FeaturedServices from "../FeaturedServices";
import TopDecorators from "../TopDecorators";
import CoverageMap from "../CoverageMap";
import Banner from "../Banner";
import Stats from "../Stats";
import HowItWorks from "../HowItWorks";
import Testimonials from "../Testimonials";
import FAQ from "../FAQ";
import Newsletter from "../Newsletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Stats /> {/* Section 2 */}
      <FeaturedServices />
      <HowItWorks /> {/* Section 4 */}
      <TopDecorators />
      <Testimonials /> {/* Section 6 */}
      <CoverageMap />
      <FAQ /> {/* Section 8 */}
      <Newsletter /> {/* Section 9 */}
    </div>
  );
};

export default Home;
