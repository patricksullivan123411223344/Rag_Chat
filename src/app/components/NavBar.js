'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        {href: '/', label: 'Chat Interface'},
        {href: '/', label: 'Bookmarked Information'},
        {href: '/', label: 'Settings'},
     ];

     return (
        <nav className="flex justify-between items-center px-8 py-4 bg-neutral-950 text-white">
            <div className="text-xl font-semibold">My App</div>
            <ul className="flex space-x-6">
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`hover:text-gray-400 transition-colors ${pathname === href ? 'text-blue-400 font-bold' : ''}`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
     );
}
