import {Route, Routes} from "react-router";
import Main from "@/components/Main/Main.tsx";
import {Members} from "@/pages/Members/Members.tsx";
import { Test } from "./pages/Test";

function App() {
  return (
      <Routes>
          <Route path="test" element={<Test />} />
        <Route path="*" element={<Main />}>
          <Route index element={<>응애</>} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
  )
}

export default App;
