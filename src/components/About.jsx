import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import api from "../api";

function About() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    api
      .get("/api/about")
      .then((res) => setAbout(res.data))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="section">
      {/* Section Heading */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Get to know me
        </p>

        <h2 className="title mt-2">About Me</h2>
      </div>

      {/* About Card */}
      <div className="card overflow-hidden">
        <div className="grid gap-10 p-8 md:grid-cols-3 md:p-10">
          
          {/* About Content */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-white">
              {about.fullName || "Nilesh Kumar"}
            </h3>

            <p className="mt-2 text-lg font-medium text-blue-400">
              {about.role || "Java Full Stack Developer"}
            </p>

            <div className="mt-6 h-1 w-16 rounded-full bg-blue-500" />

            <p className="mt-6 text-base leading-8 text-slate-300 whitespace-pre-line">
              {about.bio ||
                "I am a Java Full Stack Developer skilled in Spring Boot, REST APIs, React, PostgreSQL and deployment."}
            </p>
          </div>

          {/* Contact Information */}
          <div className="md:border-l md:border-slate-700 md:pl-8">
            <h4 className="mb-5 text-3xl font-semibold text-white">
              Contact Information
            </h4>

            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {about.location || "India"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${about.email || "imnileshkumar06@gmail.com"}`}
                    className="mt-1 block truncate text-sm text-slate-300 transition hover:text-blue-400"
                  >
                    {about.email || "imnileshkumar06@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${about.phone || "+91 7033239572"}`}
                    className="mt-1 block text-sm text-slate-300 transition hover:text-blue-400"
                  >
                    {about.phone || "+91 7033239572"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;