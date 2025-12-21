import CardSkeleton from "./CardSkeleton";

const ServicesSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
export default ServicesSkeletonGrid;
