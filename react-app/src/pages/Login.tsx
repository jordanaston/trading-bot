import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import loginUser from "../hooks/useLoginuser";

type LoginProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

function Login({ setIsLoggedIn }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const loginResponse = await loginUser(username, password);

      if (loginResponse.message === "Login successful") {
        console.log("Login successful");
        setIsLoggedIn(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="font-mono flex items-center justify-center min-h-screen -mt-20">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <DotLoader size={45} color="#fff" />
        </div>
      ) : (
        <div>
          <img src="/ares.png" alt="Ares" className="mx-auto mt-4 w-16 h-16" />
          <div className="flex flex-col justify-center mx-auto text-sm">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-4 p-2 border rounded bg-transparent text-white focus:outline-none w-64"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 p-2 border rounded bg-transparent text-white focus:outline-none w-64"
            />

            <button
              onClick={handleLogin}
              className="mt-4 p-2 text-white border rounded focus:outline-none active:scale-95 transition-transform"
              disabled={loading}
            >
              Enter
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
