type IconName = "brain" | "building" | "mail" | "mapPin" | "phone" | "search" | "sparkles" | "user";

const paths: Record<IconName, string> = {
  brain: "M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5.5A3 3 0 0 0 6 18h1a3 3 0 0 0 3 3V3Zm6 0a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5.5A3 3 0 0 1 18 18h-1a3 3 0 0 1-3 3V3ZM6 8h3m-4 5h4m8-5h-3m4 5h-4M10 11h4",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M8 7h4m-4 4h4m-4 4h4M8 21v-3h4v3",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  mapPin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  phone: "M6 3h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3c0 1-1 2-2 2C10 19 5 14 5 6c0-1 0-2 1-3Z",
  search: "m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  sparkles: "m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3ZM19 15l-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6L19 15ZM5 14l-.5 2L3 16.5l1.5.5.5 2 .5-2 1.5-.5-1.5-.5L5 14Z",
  user: "M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
};

export default function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}