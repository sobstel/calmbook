import Link from "next/link";

export default function Logo() {
  return (
    <div className="text-center pb-4">
      <Link href="/">
        <a className="text-sm text-gray-600 hover:underline">calmbook</a>
      </Link>
    </div>
  );
}
