import { motion } from "framer-motion";
import { FaHandshake, FaLightbulb, FaUserTie } from "react-icons/fa";

const About = () => {
  return (
    <div className="pt-20">
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/Q7xGyjc6/christmas-new-year-decoration-bauble-christmas-tree.jpg)",
        }}
      >
        <div className="hero-overlay  "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-white mb-4"
            >
              About StyleDecor
            </motion.h1>
            <p className="text-xl text-gray-200">
              Crafting memories, designing dreams, and celebrating life.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="md:w-1/2"
          >
            <img
              src="https://i.ibb.co/XfC9GJrg/group-young-business-people.jpg"
              alt="Our Team Working"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-bold text-primary">Who We Are</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2020, <strong>StyleDecor</strong> began with a simple
              idea: that every event deserves to be a masterpiece. What started
              as a small team of passionate designers has grown into
              Bangladesh's premier event decoration service.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We specialize in weddings, corporate galas, and intimate
              celebrations. Our mission is to take the stress out of event
              planning so you can focus on making memories.
            </p>

            <div className="flex gap-8 mt-4">
              <div>
                <h3 className="text-3xl font-bold text-secondary-content">
                  500+
                </h3>
                <p className="text-sm">Events Managed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-secondary-content">
                  99.98%
                </h3>
                <p className="text-sm">Client Satisfaction</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-secondary-content">
                  50+
                </h3>
                <p className="text-sm">Expert Decorators</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* cards*/}
      <div className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="card bg-base-300 shadow-xl p-8 text-center hover:scale-105 transition-transform duration-200">
              <div className="text-5xl text-primary mx-auto mb-4">
                <FaLightbulb className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Creative Vision</h3>
              <p className="text-gray-500">
                We don't just follow trends; we set them. Our designs are unique
                to your story.
              </p>
            </div>

            <div className="card bg-base-300 shadow-xl p-8 text-center hover:scale-105 transition-transform duration-200">
              <div className="text-5xl text-secondary mx-auto mb-4">
                <FaUserTie className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Team</h3>
              <p className="text-gray-500">
                Our decorators are vetted experts with years of experience in
                the field.
              </p>
            </div>

            <div className="card bg-base-300 shadow-xl p-8 text-center hover:scale-105 transition-transform duration-200">
              <div className="text-5xl text-accent mx-auto mb-4">
                <FaHandshake className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliable Service</h3>
              <p className="text-gray-500">
                On time, every time. We value your schedule and your trust above
                all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
