import "./App.css";
import SignUp from "./components/signUp";

function App() {
  return (
    <>
      <div className="flex justify-center mt-40">
        <p>Trading Bot</p>
      </div>
      <div className="flex justify-center mt-32">
        <SignUp />
      </div>
    </>
  );
}

export default App;
