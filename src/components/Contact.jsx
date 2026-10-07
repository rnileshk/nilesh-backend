import { useState } from "react";
import api from "../api";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/contact", form);
    alert("Message sent successfully");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section">
      <h2 className="title">Contact Me</h2>

      <form onSubmit={submit} className="card p-8 max-w-3xl space-y-4">
        <input
          className="input"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="input h-36"
          placeholder="Your Message"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="btn">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;