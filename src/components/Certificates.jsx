import { useEffect, useState } from "react";
import api from "../api";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api
      .get("/api/certificates")
      .then((res) => setCertificates(res.data))
      .catch(() => console.log("Certificates not found"));
  }, []);

  return (
    <section id="certificates" className="section">
      <h2 className="title">Certificates & Achievements</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {certificates.length === 0 ? (
          <div className="card p-6 text-slate-400">
            No certificates added yet.
          </div>
        ) : (
          certificates.map((item) => (
            <div key={item.id} className="card p-6">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  onClick={() => setSelectedImage(item.imageUrl)}
                  className="h-44 w-full rounded-2xl object-cover mb-5 cursor-pointer hover:scale-105 transition"
                />
              )}

              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-blue-300 mt-1">{item.issuer}</p>
              <p className="text-sm text-slate-400 mt-1">{item.date}</p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="mt-4 inline-block text-green-300"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))
        )}
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

export default Certificates;