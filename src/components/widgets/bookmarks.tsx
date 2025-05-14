import Link from "next/link";

export const Bookmarks = () => {
  const links = [
    { name: "GitHub", url: "https://github.com" },
    { name: "DevDocs", url: "https://devdocs.io" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
  ];

  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.url}>
          <Link
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
