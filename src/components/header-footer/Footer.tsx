import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import {
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  MapPin,
  Globe,
  ChevronRight,
} from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/company/karmadude/posts/?feedView=all",
      hoverBg: "hover:bg-[#0077b5]",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      href: "https://www.instagram.com/karmadudeitsolutions/",
      hoverBg: "hover:bg-[#E1306C]",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      href: "https://www.facebook.com/people/Karmadude-It-Solutions/61575797861365/",
      hoverBg: "hover:bg-[#1877F2]",
    },
  ];

  const services = [
    { name: "Web Applications", href: "/web-applications" },
    { name: "Product Engineering", href: "/product-engineering" },
    { name: "Custom Software", href: "/custom-software" },
    { name: "Mobile Apps", href: "/mobile-application" },
    { name: "UI/UX Design", href: "/ui-ux" },
    { name: "Digital Marketing", href: "/digital-marketing" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Portfolio", href: "/our-works" },
    { name: "Android Testers", href: "/testers" },
    // { name: "Internships", href: "/Internships" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-100">
      {/* Subtle Background Aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3] mix-blend-multiply z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8 text-left">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-4 space-y-6 lg:space-y-10">
            <Link
              to="/"
              className="inline-block transition-transform hover:scale-105 duration-300 mt-2 lg:mt-2.5"
            >
              <img
                src={logo}
                alt="Karma Dude Logo"
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 leading-relaxed text-base lg:text-lg font-light max-w-sm">
              A global digital studio crafting premium web and mobile
              experiences. Driven by innovation, designed for global impact.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-all duration-500 ${link.hoverBg} hover:text-white hover:border-transparent hover:shadow-xl hover:-translate-y-1.5`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1 lg:col-span-3 lg:pl-10">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6 lg:mb-10 pb-4 border-b border-slate-100 inline-block lg:block">
              Services
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              {services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-[#2f8ecd] transition-all duration-300 text-sm lg:text-[15px] font-medium flex items-center group gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-[#2f8ecd] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden lg:block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6 lg:mb-10 pb-4 border-b border-slate-100 inline-block lg:block">
              Company
            </h4>
            <ul className="space-y-3 lg:space-y-4">
              {company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-[#2f8ecd] transition-all duration-300 text-sm lg:text-[15px] font-medium flex items-center group gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-[#2f8ecd] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden lg:block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6 lg:mb-10 pb-4 border-b border-slate-100 inline-block lg:block">
              Get in Touch
            </h4>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start gap-3 lg:gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2f8ecd] shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wider">
                    Ahmedabad
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    Gujarat, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wider">
                    International
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    Canada , USA & UK Presence
                  </p>
                </div>
              </div>

              <div className="-mt-2">
                <a
                  href="mailto:kanak@karmadude.in"
                  className="inline-flex items-center gap-3 px-6 py-3 lg:px-8 lg:py-3.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-[#2f8ecd] hover:shadow-xl transition-all duration-300"
                >
                  <Mail size={16} />
                  kanak@karmadude.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-slate-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-4 lg:py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-900 font-bold">
              KarmaDude Enterprise
            </span>
            . All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
            <Link
              to="/Privacy"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
            {/* <Link
              to="/terms"
              className="hover:text-slate-900 transition-colors"
            >
              Terms
            </Link> */}
            {/* <Link
              to="/sitemap"
              className="hover:text-slate-900 transition-colors"
            >
              Sitemap
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
