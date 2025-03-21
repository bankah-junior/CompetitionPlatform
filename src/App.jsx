import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Timer, Trophy, Keyboard, Home as HomeIcon } from "lucide-react";
import QuestionDisplay from "./components/QuestionDisplay";
import Leaderboard from "./components/Leaderboard";

const CORRECT_PASSPHRASE = "letmein";

function PassphraseAuth({ onAuth }) {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/home"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = () => {
    if (passphrase === CORRECT_PASSPHRASE) {
      localStorage.setItem("authenticated", "true");
      onAuth(true);
      navigate("/home"); // Redirect to homepage after successful login
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-transparent">
      <div className="p-8 text-center bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold">Enter Pass-Phrase</h2>
        <input
          type="password"
          placeholder="Enter pass-phrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full px-4 py-2 text-black border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="mt-2 text-red-400">Incorrect pass-phrase!</p>}
      </div>
    </div>
  );
}

function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" replace />;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        {/* Navigation */}
        {isAuthenticated && (
          <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link to="/home" className="flex items-center">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    <span className="ml-2 text-xl font-bold text-white">
                      Competition Platform
                    </span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="hidden md:flex space-x-4">
                  <NavLink to="/home" icon={HomeIcon}>
                    Home
                  </NavLink>
                  <NavLink to="/questions" icon={Timer}>
                    Questions
                  </NavLink>
                  <NavLink to="/leaderboard" icon={Keyboard}>
                    Leaderboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-white px-3 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
              {isMobileMenuOpen && (
                <div className="md:hidden">
                  <div className="flex flex-col space-y-2 mt-2">
                    <NavLink to="/home" icon={HomeIcon}>
                      Home
                    </NavLink>
                    <NavLink to="/questions" icon={Timer}>
                      Questions
                    </NavLink>
                    <NavLink to="/leaderboard" icon={Keyboard}>
                      Leaderboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-white px-3 py-2 rounded-md hover:bg-white/10 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={<PassphraseAuth onAuth={setIsAuthenticated} />}
            />
            <Route
              path="/home"
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route
              path="/questions"
              element={<ProtectedRoute element={<QuestionDisplay />} />}
            />
            <Route
              path="/leaderboard"
              element={<ProtectedRoute element={<Leaderboard />} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, children, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive ? "bg-white/10" : "hover:bg-white/10"
      } text-white px-3 py-2 rounded-md flex items-center transition-colors`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {children}
    </Link>
  );
}

function HomePage() {
  return (
    <div className="text-center space-y-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to the Coding Competition
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Test your skills across three challenging rounds!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <Timer className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Round One</h2>
            <p className="text-white/70">
              Basic programming challenges focusing on fundamental concepts.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <Keyboard className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Round Two</h2>
            <p className="text-white/70">
              String manipulation and advanced programming problems.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Round Three
            </h2>
            <p className="text-white/70">
              Array operations and complex algorithmic challenges.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/questions"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            <Timer className="h-5 w-5 mr-2" />
            Start Competition
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
