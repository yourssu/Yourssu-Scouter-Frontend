import { GoogleCallback } from "@/components/Auth/GoogleCallback";
import Main from "@/components/Main/Main.tsx";
import { Members } from "@/pages/Members/Members.tsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/oauth/callback/google" element={<GoogleCallback />} />
      <Route path="*" element={<Main />}>
        <Route index element={<>응애</>} />
        <Route path="members" element={<Members />} />
      </Route>
    </Routes>
  );
}

export default App;
