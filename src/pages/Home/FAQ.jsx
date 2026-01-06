const FAQ = () => {
  return (
    <div className="py-20 px-4 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="join join-vertical w-full bg-base-100 shadow-xl">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Do you provide custom themes?
            </div>
            <div className="collapse-content">
              <p>Yes! Contact us for bespoke designs.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              What is your refund policy?
            </div>
            <div className="collapse-content">
              <p>Full refund if cancelled 7 days prior.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Do you cover outside Dhaka?
            </div>
            <div className="collapse-content">
              <p>Currently, we only operate within Dhaka City.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FAQ;
