import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center mt-6">
      <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
        Termos
      </Link>
      <span className="text-gray-400 mx-2">|</span>
      <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
        Privacidade
      </Link>
    </footer>
  );
}