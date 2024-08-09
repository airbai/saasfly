"use client";
import { cn } from "@saasfly/ui";
import {Iztrolabe} from "react-iztro"

export const Astrologyx = ()=>{
  return (
    <div className={cn("max-w-6xl mx-auto")}>
      <Iztrolabe 
        birthday="2003-10-12" 
        birthTime={1} 
        birthdayType="solar" 
        gender="male" 
        horoscopeDate={new Date()} 
        horoscopeHour={1} 
        lang="en-US"
      />
    </div>
  );
}
