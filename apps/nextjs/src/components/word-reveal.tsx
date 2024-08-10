import React from 'react';
import TextReveal from "@saasfly/ui/text-reveal";

interface WordRevealProps {
  textReveal: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({ textReveal }) => {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg dark:bg-black">
      <TextReveal text={textReveal} />
    </div>
  );
};