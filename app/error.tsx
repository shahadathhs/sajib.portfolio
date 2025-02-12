"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <pre className="mt-4 text-red-700">{error.message}</pre>
      <button className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
