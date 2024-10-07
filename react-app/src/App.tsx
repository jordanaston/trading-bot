import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Home setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
