"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function ScheduleCallButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/contact');
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleClick}
    >
      Schedule a Call
    </Button>
  );
}
