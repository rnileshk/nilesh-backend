import { useEffect, useState } from "react";
import api from "../api";

function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get("/api/education").then((res) => setEducation(res.data)).catch(() => {});
  }, []);

  return (
    <section id="education" className="section">
      <h2 className="title">Education</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {education.length === 0 && (
          <div className="card p-6 text-slate-400">No education added yet.</div>
        )}

        {education.map((item) => (
          <div key={item.id} className="card p-6">
            <h3 className="text-2xl font-bold">{item.degree}</h3>
            <p className="text-blue-300 mt-1">{item.institute}</p>
            <p className="text-sm text-slate-400 mt-1">{item.duration}</p>
            <p className="text-slate-300 mt-4">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;