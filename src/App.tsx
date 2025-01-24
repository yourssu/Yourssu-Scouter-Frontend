import {Route, Routes} from "react-router";
import SideNavigation from "@/components/SideNavigation/SideNavigation.tsx";

function App() {

  return (
      <Routes>
        <Route path="*" element={<SideNavigation />}>
          <Route index element={<>응애</>} />
          <Route path="about" element={<></>} />
        </Route>
      </Routes>

  )
}

export default App
