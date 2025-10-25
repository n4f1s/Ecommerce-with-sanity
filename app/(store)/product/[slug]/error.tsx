'use client';


const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
            <p className="mt-2 text-gray-600">{error.message}</p>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-theme-primary text-white rounded hover:theme-secondary"
            >
                Try Again
            </button>
        </div>
    );
};

export default Error;