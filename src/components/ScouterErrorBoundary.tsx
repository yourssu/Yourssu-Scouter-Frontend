import {QueryErrorResetBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {ReactNode} from "react";

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
            >
                {children}
            </ErrorBoundary>
        )}
    </QueryErrorResetBoundary>
}

export default ScouterErrorBoundary;