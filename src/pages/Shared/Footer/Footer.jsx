import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className=" p-10 max-w-7xl mx-auto  ">
        <div className="flex md:flex-row flex-col md:justify-between items-center md:items-baseline-last">
          <nav className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">StyleDecor</h2>
            <p className="font-medium mt-2">
              Premium Decoration Services.
              <br />
              Making your events memorable since 2025.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>📍 Address:</strong> Uttara, Dhaka-1230
              </p>
              <p>
                <strong>📞 Phone:</strong> +880 17222222
              </p>
              <p>
                <strong>✉️ Email:</strong> support@styledecor.com
              </p>
            </div>
          </nav>

          <nav className="text-center md:text-left mt-10">
            <h6 className="footer-title text-white opacity-100 mb-2">
              Working Hours
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between md:justify-start gap-6">
                <span className="w-20 text-left">Mon - Fri:</span>
                <span className="font-bold">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between md:justify-start gap-6">
                <span className="w-20 text-left">Saturday:</span>
                <span className="font-bold">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between md:justify-start gap-6">
                <span className="w-20 text-left">Sunday:</span>
                <span className="text-error font-bold">Closed</span>
              </div>
            </div>
          </nav>
        </div>

        <nav className="flex flex-col justify-center items-center mt-10">
          <h6 className="footer-title text-white opacity-100 mb-2">Social</h6>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://facebook.com"
              className="hover:text-blue-500 transition-transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-500 transition-transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-sky-400 transition-transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-blue-700 transition-transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>

      {/* 4. Copyright Section */}
      <div className="footer footer-center p-4 bg-neutral-focus text-white border-t border-gray-700">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            StyleDecor Ltd.
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
