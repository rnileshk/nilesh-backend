import { useState } from "react";
import { MailIcon, MapPin, ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaJava, FaLinkedin } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  const [selectedImage, setSelectedImage] = useState(null);

  const quickLinks = ["About", "Projects", "Skills", "Contact"];

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.1),transparent_38%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-blue-500/10">
                <FaJava size={34} className="text-red-500" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Nilesh<span className="text-blue-400"> Kumar</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Java Full Stack Developer
                </p>
              </div>

              <img
                src="/fevico.png"
                alt="Nilesh Kumar"
                onClick={() => setSelectedImage("/fevico.png")}
                className="h-14 w-14 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-1 object-cover shadow-lg shadow-blue-500/10 transition hover:scale-105"
              />
            </div>

            <p className="max-w-md text-md leading-6 text-slate-400">
              Building clean, responsive, and scalable web applications using
              Java, Spring Boot, React, MongoDB, and REST APIs.
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={14} className="text-blue-400" />
              Bangalore, India
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Navigate
            </h4>

            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group inline-flex items-center gap-1 text-xs text-slate-400 transition hover:text-blue-400"
                  >
                    {item}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Connect
            </h4>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/rnileshk"
                target="_blank"
                rel="noreferrer"
                className="footer-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/rnilesh"
                target="_blank"
                rel="noreferrer"
                className="footer-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:imnileshkumar06@gmail.com"
                className="footer-icon"
                aria-label="Email"
              >
                <MailIcon size={16} />
              </a>

              <a
                href="https://instagram.com/imnileshkumar6"
                target="_blank"
                rel="noreferrer"
                className="footer-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Open to Java Full Stack Developer roles.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-4">
          {[
            "Java",
            "Spring Boot",
            "Microservices",
            "React",
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "REST API",
            "GitHub",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 text-center text-xs tracking-wide text-slate-500">
          © {year} Nilesh Kumar. All rights reserved.
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </footer>
  );
}

export default Footer;