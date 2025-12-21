const CardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 animate-pulse">
      <div className="h-56 bg-base-300 rounded-t-xl w-full"></div>

      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-base-300 rounded w-1/2"></div>
          <div className="h-5 bg-base-300 rounded w-1/4"></div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-5/6"></div>
          <div className="h-4 bg-base-300 rounded w-4/6"></div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 bg-base-300 rounded w-1/4"></div>
          <div className="h-10 bg-base-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
