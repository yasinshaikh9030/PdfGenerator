import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import DownloadPage from "./pages/DownloadPage.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = () => {
    setIsInfoOpen((prev) => !prev);
  };

  const closeInfo = () => {
    setIsInfoOpen(false);
  };

  return (
    <div className="app-shell flex min-h-screen flex-col bg-gradient-to-b from-red-50 via-white to-red-100">
      <header className="sticky top-0 z-20 border-b border-red-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-primary hover:text-primary-dark"
            onClick={closeInfo}
          >
            Image to PDF
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={toggleInfo}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-xs font-semibold text-primary shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Open info menu"
            >
              i
            </button>
            {isInfoOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-red-100 bg-white p-2 text-sm shadow-lg">
                <Link
                  to="/about"
                  onClick={closeInfo}
                  className="block rounded px-2 py-1 text-neutral-700 hover:bg-red-50"
                >
                  About
                </Link>
                <Link
                  to="/privacy-policy"
                  onClick={closeInfo}
                  className="block rounded px-2 py-1 text-neutral-700 hover:bg-red-50"
                >
                  Privacy
                </Link>
                <Link
                  to="/contact"
                  onClick={closeInfo}
                  className="block rounded px-2 py-1 text-neutral-700 hover:bg-red-50"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-red-100 bg-white/80">
          <p className="mx-auto max-w-5xl px-4 py-2 text-center text-xs text-neutral-600 sm:text-sm">
            Create and share PDFs from your images in three simple steps.
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
        <div className="app-card w-full rounded-2xl bg-white/90 p-4 shadow-xl sm:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-neutral-500">
        for more information contact on yasinshaikh2186@gmail.com
      </footer>
    </div>
  );
}

export default App;
