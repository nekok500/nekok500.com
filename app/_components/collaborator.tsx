"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import Image from "next/image";

export default function Collaborator({
  name,
  avatar,
  className,
}: {
  name: string;
  avatar: string;
  className?: string;
}): ReactNode {
  const [isOpen, setIsPopover] = useState(false);

  return (
    <Popover isOpen={isOpen} placement="top" showArrow={true}>
      <PopoverTrigger
        onMouseEnter={() => setIsPopover(true)}
        onMouseLeave={() => setIsPopover(false)}
      >
        <Image
          className={`rounded-full ${className}`}
          src={avatar}
          width={24}
          alt={""}
          height={24}
        />
      </PopoverTrigger>
      <PopoverContent>{name}</PopoverContent>
    </Popover>
  );
}
