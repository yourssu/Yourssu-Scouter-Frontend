import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { GoogleCallback } from '@/components/Auth/GoogleCallback';
import Main from '@/components/Main/Main.tsx';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Applicants } from '@/pages/Applicants/Applicants.tsx';
import CalendarTestPage from '@/pages/CalendarTestPage';
import { InterviewPage } from '@/pages/Interview/Interview';
import { Members } from '@/pages/Members/Members.tsx';
import { SendMail } from '@/pages/SendMail/SendMail';
import { Templates } from '@/pages/Template/Templates';

function App() {
  return (
    <ScouterErrorBoundary>
      <Suspense>
        <Routes>
          <Route element={<GoogleCallback />} path="/oauth/callback/google" />
          <Route element={<Main />} path="*">
            <Route element={<>응애</>} index />
            <Route element={<InterviewPage />} path="interview" />
            <Route element={<CalendarTestPage />} path="test" />
            <Route element={<Members />} path="members" />
            <Route element={<Applicants />} path="recruiting" />
            <Route element={<Templates />} path="templates" />
            <Route element={<SendMail />} path="send-mail" />
          </Route>
        </Routes>
      </Suspense>
    </ScouterErrorBoundary>
  );
}

export default App;
