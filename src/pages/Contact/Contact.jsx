import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Contact = () => {
  const axiosPublic = useAxios();
  const handleSendMessage = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const contactData = {
      name,
      email,
      subject,
      message,
    };

    axiosPublic
      .post("/contact", contactData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Message Sent!",
            text: "We have received your message and will reply soon.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          form.reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a question about our services? Want to discuss a custom theme?
            Fill out the form below or visit us at our HQ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          <div className="space-y-8">
            <div className="card bg-base-200 shadow-xl dark:shadow-white/20">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-6 text-primary-content">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-primary shadow-sm">
                      <FaMapMarkerAlt className="text-black/90" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Our Location</h4>
                      <p className="text-gray-600">Uttara, Dhaka-1230</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-primary shadow-sm">
                      <FaPhoneAlt className="text-black/90" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Phone Number</h4>
                      <p className="text-gray-600">+880 1743012</p>
                      <p className="text-gray-600 text-sm">
                        (Available 10 AM - 8 PM)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-primary shadow-sm">
                      <FaEnvelope className="text-black/90" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Email Address</h4>
                      <p className="text-gray-600">support@styledecor.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl dark:shadow-white/20">
            <div className="card-body">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSendMessage} className="space-y-4 ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered w-full bg-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@example.com"
                    className="input input-bordered w-full  bg-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Wedding Decoration Inquiry"
                    className="input input-bordered w-full  bg-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    name="message"
                    className="textarea textarea-bordered h-32  bg-primary w-full"
                    placeholder="Tell us about your event..."
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary  text-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
