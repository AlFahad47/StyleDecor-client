const Newsletter = () => {
  return (
    <div className="py-20 px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-8">
        Get the latest trends and offers directly to your inbox.
      </p>
      <div className="join">
        <input
          className="input input-bordered join-item w-64"
          placeholder="Email address"
        />
        <button className="btn btn-primary join-item rounded-r-full">
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default Newsletter;
