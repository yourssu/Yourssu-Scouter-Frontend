import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ScouterErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => {
            const handleClick = () => {
              resetErrorBoundary();
              reset();
            };

            return (
              <div>
                <button onClick={handleClick}>Try again</button>
              </div>
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ScouterErrorBoundary;
