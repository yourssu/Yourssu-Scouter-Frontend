import { GoogleCallback } from '@/components/Auth/GoogleCallback';
import Main from '@/components/Main/Main.tsx';
import { Members } from '@/pages/Members/Members.tsx';
import { Route, Routes } from 'react-router';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Applicants } from '@/pages/Applicants/Applicants.tsx';
import { Suspense } from 'react';

function App() {
  return (
    <ScouterErrorBoundary>
      <Suspense>
        <Routes>
          <Route path="/oauth/callback/google" element={<GoogleCallback />} />
          <Route path="*" element={<Main />}>
            <Route index element={<>응애</>} />
            <Route path="members" element={<Members />} />
            <Route path="recruiting" element={<Applicants />} />
          </Route>
        </Routes>
      </Suspense>
    </ScouterErrorBoundary>
  );
}

export default App;
