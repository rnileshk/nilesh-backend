import { useEffect, useState } from "react";
import api from "../api";

function Work() {
  const [work, setWork] = useState([]);

  useEffect(() => {
    api.get("/api/work").then((res) => setWork(res.data)).catch(() => {});
  }, []);

  return (
    <section id="work" className="section">
      <h2 className="title">Work Experience</h2>

      <div className="space-y-6">
        {work.length === 0 && (
          <div className="card p-6 text-slate-400">No work experience added yet.</div>
        )}

        {work.map((item) => (
          <div key={item.id} className="card p-6">
            <h3 className="text-2xl font-bold">{item.role}</h3>
            <p className="text-blue-300 mt-1">{item.company}</p>
            <p className="text-sm text-slate-400 mt-1">{item.duration}</p>
            <p className="text-slate-300 mt-4 whitespace-pre-line">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;