import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home/Home";
import { Upload } from "./pages/Upload/Upload";
import { Preview } from "./pages/Preview/Preview";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Help } from "./pages/Help/Help";

function App() {
  return (
    <div className="flex min-h-screen w-full bg-background text-on-background">
      {/* Permanent Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        <Navbar />
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="w-full py-4 border-t border-outline-variant/20 bg-surface-container-lowest px-6 md:px-8 text-xs text-on-surface-variant/40 flex flex-col sm:flex-row justify-between items-center gap-2 select-none">
          <span>FoodFusion v1.2.4 • All cloud operations nominal</span>
          <div className="flex gap-4">
            <a href="/help" className="hover:text-primary transition-colors">Documentation</a>
            <a href="/help" className="hover:text-primary transition-colors">Staging Schema</a>
            <a href="/help" className="hover:text-primary transition-colors">SLA Status</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
