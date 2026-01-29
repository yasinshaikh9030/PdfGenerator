import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import DownloadPage from "./pages/DownloadPage.jsx";

function App() {
  return (
    <div className="app-shell flex min-h-screen flex-col bg-gradient-to-b from-red-50 via-white to-red-100">
      <header className="sticky top-0 z-20 border-b border-red-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold tracking-tight text-primary">
            Image to PDF
          </span>
          <span className="hidden text-xs text-neutral-500 sm:inline">
            Create and share PDFs from your images in three simple steps.
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
        <div className="app-card w-full rounded-2xl bg-white/90 p-4 shadow-xl sm:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/download" element={<DownloadPage />} />
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
