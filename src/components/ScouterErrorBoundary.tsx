import {QueryErrorResetBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {ReactNode} from "react";
import {HTTPError} from "ky";
import {authService} from "@/apis/auth.service.ts";

interface ScouterErrorBoundaryProps {
    children: ReactNode;
}

const ScouterErrorBoundary = ({children}: ScouterErrorBoundaryProps) => {
    return <QueryErrorResetBoundary>
        {({reset}) => (
            <ErrorBoundary
                fallbackRender={({resetErrorBoundary}) => {
                    const handleClick = () => {
                        resetErrorBoundary();
                        reset();
                    }

                    return (
                        <div>
                            <button onClick={handleClick}>Try again</button>
                        </div>
                    )
                }}
                onError={(e) => {
                    if (e instanceof HTTPError) {
                        if (e.response.status === 401) {
                            authService.initiateGoogleLogin();
                        }
                    }
                }}
            >
                {children}
            </ErrorBoundary>
        )}
    </QueryErrorResetBoundary>
}

export default ScouterErrorBoundary;