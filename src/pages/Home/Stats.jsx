const Stats = () => {
  return (
    <div className="bg-primary text-primary-content py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around text-center gap-8">
        <div>
          <div className="text-5xl font-bold mb-2">500+</div>
          <div className="text-lg opacity-80">Events Completed</div>
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">98%</div>
          <div className="text-lg opacity-80">Satisfaction Rate</div>
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">50+</div>
          <div className="text-lg opacity-80">Expert Decorators</div>
        </div>
      </div>
    </div>
  );
};
export default Stats;
