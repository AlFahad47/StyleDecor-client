const Testimonials = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">What Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card bg-base-100 shadow-xl border p-6">
            <div className="rating mb-4">
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
            </div>
            <p className="text-gray-500 mb-4">
              "Absolutely amazing service! The decoration was exactly what I
              dreamed of."
            </p>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                </div>
              </div>
              <div>
                <h4 className="font-bold">Happy Client {i}</h4>
                <p className="text-xs">Wedding Event</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Testimonials;
