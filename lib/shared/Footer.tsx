import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-200 shadow-md rounded-sm text-base-content h-12">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <Link
            target="_blank"
            href="https://github.com/shahadathhs"
            className="link link-hover text-blue-500"
          >
            shahahdathhs
          </Link>
        </p>
      </aside>
    </footer>
  );
}
