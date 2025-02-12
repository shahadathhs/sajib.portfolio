import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">NotFound</h1>

      <div className="w-full flex justify-center items-center">
      <Link href="/" className="btn btn-error">
        Back to Home
      </Link>
      </div>
    </div>
  );
}
