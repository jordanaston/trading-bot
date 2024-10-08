import { useState } from "react";
import controlBot from "../hooks/useControlBot";

enum ControlBot {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

type NavProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  refetchBotStatus: () => void;
};

const Nav = ({ setIsLoggedIn, refetchBotStatus }: NavProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleControlBot = async (control: string) => {
    const response = await controlBot(control);
    console.log(response.message);
  };
  return (
    <div className="flex justify-end items-center p-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-12 right-0 h-full bg-transparent z-50 transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              refetchBotStatus();
            }}
            className="block w-full text-left text-sm py-2 px-4 mb-2 text-white focus:outline-none hover:text-gray-400"
          >
            Close
          </button>
          <button
            onClick={async () => {
              await handleControlBot(ControlBot.ACTIVE);
              setIsDrawerOpen(false);
              refetchBotStatus();
            }}
            className="block w-full text-left text-sm py-2 px-4 mb-2 text-white focus:outline-none hover:text-gray-400"
          >
            Activate Bot
          </button>
          <button
            onClick={async () => {
              await handleControlBot(ControlBot.INACTIVE);
              setIsDrawerOpen(false);
              refetchBotStatus();
            }}
            className="block w-full text-left text-sm py-2 px-4 mb-2 text-white focus:outline-none hover:text-gray-400"
          >
            Deactivate Bot
          </button>
          <button
            onClick={() => {
              handleLogout();
              refetchBotStatus();
            }}
            className="block w-full text-left text-sm py-2 px-4 mb-2 text-white focus:outline-none hover:text-gray-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
