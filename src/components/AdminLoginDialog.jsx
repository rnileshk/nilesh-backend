import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminLoginDialog({ open, onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/login", form);

      localStorage.setItem("admin", "true");

      setForm({
        email: "",
        password: "",
      });

      onClose();
      navigate("/admin");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Invalid email or password");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="card relative w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xl text-white hover:bg-white/20"
        >
          ×
        </button>

        <h2 className="mb-2 text-3xl font-bold">Admin Login</h2>
        <p className="mb-6 text-slate-400">
          Login to manage your portfolio content.
        </p>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="input"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="input"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button type="submit" className="btn w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginDialog;