import { useState, useEffect } from "react";

export default function PassphraseAuth() {
  const CORRECT_PASSPHRASE = "letmein"; // Change this to your desired pass-phrase
  const [passphrase, setPassphrase] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  // Check local storage on mount
  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passphrase === CORRECT_PASSPHRASE) {
      localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setIsAuthenticated(false);
    setPassphrase("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-white">
      {!isAuthenticated ? (
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center w-96">
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
            className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold"
          >
            Login
          </button>
          {error && <p className="mt-2 text-red-400">Incorrect pass-phrase!</p>}
        </div>
      ) : (
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center w-96">
          <h2 className="mb-4 text-2xl font-bold">Welcome!</h2>
          <p className="text-gray-400">You have successfully logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
