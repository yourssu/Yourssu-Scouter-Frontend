import { GoogleCallback } from "@/components/Auth/GoogleCallback";
import Main from "@/components/Main/Main.tsx";
import { Members } from "@/pages/Members/Members.tsx";
import { Route, Routes } from "react-router";
import ScouterErrorBoundary from "@/components/ScouterErrorBoundary.tsx";
import {Applicants} from "@/pages/Applicants/Applicants.tsx";

function App() {
  return (
      <ScouterErrorBoundary>
          <Routes>
              <Route path="/oauth/callback/google" element={<GoogleCallback />} />
              <Route path="*" element={<Main />}>
                  <Route index element={<>응애</>} />
                  <Route path="members" element={<Members />} />
                  <Route path="recruiting" element={<Applicants />} />
              </Route>
          </Routes>
      </ScouterErrorBoundary>
  );
}

export default App;
