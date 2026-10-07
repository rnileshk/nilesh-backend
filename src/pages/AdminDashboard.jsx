import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AnimatedBackground from "../components/AnimatedBackground";

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
};

const emptySkill = { name: "", category: "" };
const emptyWork = { role: "", company: "", duration: "", description: "" };
const emptyEducation = {
  degree: "",
  institute: "",
  duration: "",
  description: "",
};
const emptyCertificate = {
  title: "",
  issuer: "",
  date: "",
  imageUrl: "",
  link: "",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [about, setAbout] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [work, setWork] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [workForm, setWorkForm] = useState(emptyWork);
  const [educationForm, setEducationForm] = useState(emptyEducation);
  const [certificateForm, setCertificateForm] = useState(emptyCertificate);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/");
      return;
    }

    loadData();
  }, [navigate]);

  const safeArray = (data) => {
    return Array.isArray(data) ? data : [];
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const aboutReq = api.get("/api/about");
      const projectReq = api.get("/api/projects");
      const skillReq = api.get("/api/skills");
      const contactReq = api.get("/api/contact");

      const workReq = api.get("/api/work").catch(() => ({ data: [] }));
      const educationReq = api
        .get("/api/education")
        .catch(() => ({ data: [] }));
      const certificateReq = api
        .get("/api/certificates")
        .catch(() => ({ data: [] }));

      const [a, p, s, w, e, c, m] = await Promise.all([
        aboutReq,
        projectReq,
        skillReq,
        workReq,
        educationReq,
        certificateReq,
        contactReq,
      ]);

      setAbout(a.data || {});
      setProjects(safeArray(p.data));
      setSkills(safeArray(s.data));
      setWork(safeArray(w.data));
      setEducation(safeArray(e.data));
      setCertificates(safeArray(c.data));
      setMessages(safeArray(m.data));
    } catch (error) {
      console.log("LOAD DATA ERROR:", error);
      alert("Failed to load data. Please check the backend API URL.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file, maxSizeMB = 5) => {
    if (!file) return "";

    const maxSize = maxSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      alert(`File size Must be less than ${maxSizeMB}MB`);
      return "";
    }

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await api.post("/api/upload/image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.imageUrl;
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      alert("File upload failed");
      return "";
    }
  };

  const saveAbout = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/about", about);
      alert("About saved successfully!");
      loadData();
    } catch (error) {
      console.log("ABOUT SAVE ERROR:", error);
      alert("Failed to save about info.");
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/projects", projectForm);
      setProjectForm(emptyProject);
      loadData();
    } catch (error) {
      console.log("PROJECT ADD ERROR:", error);
      alert("Failed to add project.");
    }
  };

  const addSkill = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/skills", skillForm);
      setSkillForm(emptySkill);
      loadData();
    } catch (error) {
      console.log("SKILL ADD ERROR:", error);
      alert("Failed to add skill.");
    }
  };

  const addWork = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/work", workForm);
      setWorkForm(emptyWork);
      loadData();
    } catch (error) {
      console.log("WORK ADD ERROR:", error);
      alert("Failed to add work experience.");
    }
  };

  const addEducation = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/education", educationForm);
      setEducationForm(emptyEducation);
      loadData();
    } catch (error) {
      console.log("EDUCATION ADD ERROR:", error);
      alert("Failed to add education.");
    }
  };

  const addCertificate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/certificates", certificateForm);
      setCertificateForm(emptyCertificate);
      loadData();
    } catch (error) {
      console.log("CERTIFICATE ADD ERROR:", error);
      alert("Failed to add certificate.");
    }
  };

  const deleteItem = async (url) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(url);
      loadData();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("Failed to delete item. Please check the URL or backend API.");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <AnimatedBackground />

      <div className="mx-auto max-w-7xl">
        <div className="card mb-8 flex items-center justify-between p-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your portfolio content.</p>
          </div>

          <button className="rounded-xl bg-red-600 px-5 py-3" onClick={logout}>
            Logout
          </button>
        </div>

        {loading && (
          <div className="card mb-8 p-4 text-slate-300">Loading data...</div>
        )}

        <section className="card mb-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">About</h2>

          <form onSubmit={saveAbout} className="grid gap-4 md:grid-cols-2">
            {["fullName", "role", "location", "email", "phone"].map(
              (field) => (
                <input
                  key={field}
                  className="input"
                  placeholder={field}
                  value={about[field] || ""}
                  onChange={(e) =>
                    setAbout({ ...about, [field]: e.target.value })
                  }
                />
              )
            )}

            <input
              className="input"
              placeholder="Resume URL"
              value={about.resumeUrl || ""}
              onChange={(e) =>
                setAbout({ ...about, resumeUrl: e.target.value })
              }
            />

            <textarea
              className="input h-32 md:col-span-2"
              placeholder="Bio"
              value={about.bio || ""}
              onChange={(e) => setAbout({ ...about, bio: e.target.value })}
            />

            <button className="btn">Save About</button>
          </form>
        </section>

        <CrudSection
          title="Projects"
          form={projectForm}
          emptyForm={emptyProject}
          onSaved={loadData}
          setForm={setProjectForm}
          onSubmit={addProject}
          fields={["title", "techStack", "githubUrl", "liveUrl", "description"]}
          fileField="imageUrl"
          uploadFile={uploadFile}
          items={projects}
          deleteUrl="/api/projects"
          deleteItem={deleteItem}
        />

        <CrudSection
          title="Skills"
          form={skillForm}
          emptyForm={emptySkill}
          onSaved={loadData}
          setForm={setSkillForm}
          onSubmit={addSkill}
          fields={["name", "category"]}
          items={skills}
          deleteUrl="/api/skills"
          deleteItem={deleteItem}
        />

        <CrudSection
          title="Work Experience"
          form={workForm}
          emptyForm={emptyWork}
          onSaved={loadData}
          setForm={setWorkForm}
          onSubmit={addWork}
          fields={["role", "company", "duration", "description"]}
          items={work}
          deleteUrl="/api/work"
          deleteItem={deleteItem}
        />

        <CrudSection
          title="Education"
          form={educationForm}
          emptyForm={emptyEducation}
          onSaved={loadData}
          setForm={setEducationForm}
          onSubmit={addEducation}
          fields={["degree", "institute", "duration", "description"]}
          items={education}
          deleteUrl="/api/education"
          deleteItem={deleteItem}
        />

        <CrudSection
          title="Certificates"
          form={certificateForm}
          emptyForm={emptyCertificate}
          onSaved={loadData}
          setForm={setCertificateForm}
          onSubmit={addCertificate}
          fields={["title", "issuer", "date", "link"]}
          fileField="imageUrl"
          uploadFile={uploadFile}
          items={certificates}
          deleteUrl="/api/certificates"
          deleteItem={deleteItem}
        />

        <section className="card mb-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">Contact Messages</h2>

          {messages.length === 0 ? (
            <p className="text-slate-400">No messages found.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="rounded-2xl bg-black/30 p-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{msg.name}</h3>
                      <p className="text-sm text-blue-300">{msg.email}</p>
                    </div>

                    <button
                      className="text-red-400"
                      onClick={() => deleteItem(`/api/contact/${msg.id}`)}
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mt-3 text-slate-300">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function CrudSection({
  title,
  form,
  emptyForm,
  onSaved,
  setForm,
  onSubmit,
  fields,
  fileField,
  uploadFile,
  items,
  deleteUrl,
  deleteItem,
}) {
  const [editingId, setEditingId] = useState(null);
  const sectionRef = useRef(null);

  const startEdit = (item) => {
    setForm({ ...emptyForm, ...item });
    setEditingId(item.id);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    // Not editing -> normal "add" flow
    if (!editingId) {
      onSubmit(e);
      return;
    }

    e.preventDefault();

    try {
      await api.put(`${deleteUrl}/${editingId}`, form);
      cancelEdit();
      onSaved();
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      alert(`Failed to update ${title.toLowerCase()}.`);
    }
  };

  return (
    <section ref={sectionRef} className="card mb-8 p-6">
      <h2 className="mb-5 text-2xl font-bold">
        {title}
        {editingId && (
          <span className="ml-3 text-base font-normal text-yellow-300">
            (editing)
          </span>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {fields.map((field) =>
          field === "description" ? (
            <textarea
              key={field}
              className="input h-28 md:col-span-2"
              placeholder={field}
              value={form[field] || ""}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ) : (
            <input
              key={field}
              className="input"
              placeholder={field}
              value={form[field] || ""}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          )
        )}

        {fileField && (
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={async (e) => {
                const url = await uploadFile(e.target.files[0], 5);
                if (url) setForm({ ...form, [fileField]: url });
              }}
            />

            {form[fileField] && (
              <img
                src={form[fileField]}
                alt="Preview"
                className="mt-3 h-24 w-32 rounded-xl object-cover"
              />
            )}
          </div>
        )}

        <div className="flex gap-3 md:col-span-2">
          <button className="btn">
            {editingId ? `Update ${title}` : `Add ${title}`}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl bg-slate-700 px-5 py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.length === 0 ? (
          <p className="text-slate-400">No {title.toLowerCase()} added yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between gap-4 rounded-2xl bg-black/30 p-4 ${
                editingId === item.id ? "ring-2 ring-yellow-300" : ""
              }`}
            >
              <div>
                <h3 className="font-bold">
                  {item.title || item.name || item.role || item.degree}
                </h3>
                <p className="text-sm text-slate-400">
                  {item.company ||
                    item.category ||
                    item.institute ||
                    item.issuer ||
                    item.duration}
                </p>
              </div>

              <div className="flex shrink-0 items-start gap-4">
                <button
                  type="button"
                  className="text-yellow-300"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="text-red-400"
                  onClick={() => deleteItem(`${deleteUrl}/${item.id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;