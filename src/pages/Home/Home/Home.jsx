import FeaturedServices from "../FeaturedServices";
import TopDecorators from "../TopDecorators";
import CoverageMap from "../CoverageMap";
import Banner from "../Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedServices />
      <TopDecorators />
      <CoverageMap />
    </div>
  );
};

export default Home;
