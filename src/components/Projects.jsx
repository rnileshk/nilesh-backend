import { useEffect, useState } from "react";
import api from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.get("/api/projects").then((res) => setProjects(res.data)).catch(() => {});
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="title">Featured Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7">
        {projects.length === 0 && (
          <div className="card p-6 text-slate-400">No projects added yet.</div>
        )}

        {projects.map((project) => (
          <div key={project.id} className="card overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                onClick={() => setSelectedImage(project.imageUrl)}
                className="h-88 w-full rounded-2xl object-cover mb-5 cursor-pointer hover:scale-105 transition"
              />
            ) : (
              <div className="h-88 bg-white/5 flex items-center justify-center text-slate-500">
                Project Image
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="mt-4 text-sm text-blue-300">{project.techStack}</p>
              <p className="mt-3 text-slate-300 whitespace-pre-line">{project.description}</p>

              <div className="mt-6 flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" className="text-blue-300">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" className="text-green-300">
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6 md:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Certificate Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

export default Projects;