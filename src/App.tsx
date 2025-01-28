import {Route, Routes} from "react-router";
import Main from "@/components/Main/Main.tsx";

function App() {

  return (
      <Routes>
        <Route path="*" element={<Main />}>
          <Route index element={<>응애</>} />
          <Route path="about" element={<></>} />
        </Route>
      </Routes>

  )
}

export default App
