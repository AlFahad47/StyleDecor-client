import { FaSearch, FaCalendarCheck, FaSmile } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "1. Browse",
      desc: "Explore our premium packages.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "2. Book",
      desc: "Check availability & pay securely.",
    },
    {
      icon: <FaSmile />,
      title: "3. Enjoy",
      desc: "We handle the rest. You party!",
    },
  ];
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-6xl text-primary mb-6">{step.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HowItWorks;
