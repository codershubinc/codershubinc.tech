import React from 'react';
import { cn } from '@/lib/utils';

// This is a simple wrapper for icons, you might want to use lucide-react or similar
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: string; // If you want to load dynamically
}

export const Icon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide", className)}
      {...props}
    >
      {/* Default fallback or logic to render specific icon */}
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
