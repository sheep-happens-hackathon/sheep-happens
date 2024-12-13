import { useEffect } from "react";
import { makeQuery } from "./api/mistralai";
import MainPage from "./components/ui/mainPage/MainPage";

function App() {
  useEffect(() => {
    makeQuery();
  }, []);

  return <div style={{ height: "100vh", width: "100vw" }}>{<MainPage />}</div>;
}

export default App;
