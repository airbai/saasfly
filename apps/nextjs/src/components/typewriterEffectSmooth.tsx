"use client";

import React from 'react';
import { TextGenerateEffect } from "@saasfly/ui/typewriter-effect";

interface Word {
  text: string;
  className?: string;
}

interface TypewriterEffectSmoothsProps {
  prefix?: string[];
  customText: string;
  suffix?: string[];
  highlightClassName?: string;
}

export function TypewriterEffectSmooths({
  prefix = ["Build", "awesome", "apps", "and", "ship", "fast", "with"],
  customText,
  suffix = [],
  highlightClassName = "text-blue-500"
}: TypewriterEffectSmoothsProps) {
  const words: Word[] = [
    ...prefix.map(text => ({ text })),
    { text: customText, className: highlightClassName },
    ...suffix.map(text => ({ text }))
  ];

  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}