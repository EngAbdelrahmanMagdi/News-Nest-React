import { UserIconProps } from "../types/types";

export const UserIcon = ({ onClick }: UserIconProps) => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6F7D86"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M16 20v-2a4 4 0 0 0-8 0v2" />
    </svg>
  );
  