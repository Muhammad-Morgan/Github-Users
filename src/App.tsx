import { useState } from "react";
import { SearchForm, UserProfile } from "./components";
const App = () => {
  const [userName, setUserName] = useState("muhammad-morgan");

  return (
    <main className="mx-auto max-w-6xl px-8 py-20">
      <SearchForm userName={userName} setUserName={setUserName} />
      <UserProfile userName={userName} />
    </main>
  );
};

export default App;
