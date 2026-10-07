import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginDialog from "./AdminLoginDialog";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Work", href: "#work" },
    { name: "Education", href: "#education" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAdminClick = () => {
    closeMenu();

    const isAdmin = localStorage.getItem("admin") === "true";

    if (isAdmin) {
      navigate("/admin");
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" onClick={closeMenu} className="text-xl font-bold">
            Nilesh<span className="text-blue-400"> Kumar</span>
          </a>

          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={handleAdminClick}
            className="hidden rounded-full border border-blue-400/40 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/10 md:block"
          >
            Admin
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 md:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-white transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-3 text-slate-300">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={handleAdminClick}
                className="rounded-xl border border-blue-400/40 px-4 py-3 text-left text-blue-300"
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </header>

      <AdminLoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}

export default Navbar;