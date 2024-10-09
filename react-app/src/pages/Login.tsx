import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/useLoginuser";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginUser, isLoading, error } = useLoginUser();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(
        { username, password },
        {
          onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            navigate("/home");
          },
        }
      );
    } catch (err) {
      console.error(err);
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
      {isLoading ? (
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
              disabled={isLoading}
            >
              Enter
            </button>

            {error && <p className="text-red-500 mt-2">Login failed.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
