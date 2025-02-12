import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", route: "/" },
  { label: "Blogs", route: "/blogs" },
  { label: "Contact", route: "/contact" },
  { label: "Projects", route: "/projects" },
];

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 rounded-sm shadow-md container mx-auto px-4">
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            className="rounded-sm"
            width={100}
            height={40}
          />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <details>
              <summary>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2 z-50">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.route}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
