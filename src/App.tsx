import SideNavigation from "@/components/SideNavigation/SideNavigation.tsx";
import { Route, Routes } from "react-router";
import { Test } from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route path="test" element={<Test />} />
      <Route path="*" element={<SideNavigation />}>
        <Route index element={<>응애</>} />
        <Route path="about" element={<></>} />
      </Route>
    </Routes>
  );
}

export default App;
