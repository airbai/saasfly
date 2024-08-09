"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form';
import * as z from "zod";

import { cn } from "@saasfly/ui";
import { Button } from "@saasfly/ui/button";
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Input } from "@saasfly/ui/input";
import { Label } from "@saasfly/ui/label";
import { Switch } from "@saasfly/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@saasfly/ui/select";
import { Calendar } from "@saasfly/ui/calendar";
import { Meteors } from "@saasfly/ui/meteors";
import { TimePicker } from "@saasfly/ui/time-picker";
import { toast } from "@saasfly/ui/use-toast";
import type { Meteor } from "~/types/meteors";

const FormSchema = z.object({
    calendarType: z.enum(["solar", "lunar"]),
    birthDate: z.string().min(1, "Birth date is required"),
    timeOfBirth: z.string().min(1, "Time of birth is required"),
    gender: z.enum(["male", "female"]),
    name: z.string().optional(),
    location: z.string().optional(),
  });

interface AstrologyFormProps {
    userId?: string;
    dict: Record<string, string>;
  }

export function AstrologyForm({
    userId,
    dict
  }:AstrologyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    },
  });
  console.log("Current step:", currentStep);

  const isLunarDefault = false;
  const [isLunar, setisLunar] = useState<boolean>(isLunarDefault);
  const toggleLunar = () => {
    setisLunar(!isLunar);
  };

  const isMaleDefault = true;
  const [isMale, setIsMale] = useState<boolean>(isMaleDefault);
  const toggleGender = () => {
    setIsMale(!isMale);
  };

  const { handleSubmit } = methods;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form submitted with data:", data);
    if (currentStep === 5) {
      console.log("Final step reached. Navigating to next page...");
      router.push('/next-page');
    } else {
      console.log("Moving to next step...");
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const onPreviousClick = (
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  ) => {
    console.log("Moving to previous step...");
    setCurrentStep(prevStep => prevStep - 1);
  };
  const router = useRouter();

  return (
    <figure
    className={cn(
      "relative mx-auto min-h-fit w-full max-w-[588px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
      // animation styles
      "transition-all duration-200 ease-in-out hover:scale-[103%]",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    )}
  >
    <FormProvider {...methods}>
    
    <form 
        onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submit event triggered");
            methods.handleSubmit(onSubmit)(e);
          }} 
        className="space-y-6"
      >        {currentStep === 1 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
            
            <Label htmlFor="timeOfBirth">请输入生日</Label><br></br>
            <span>{dict.lunar}</span>
                <Switch
                checked={isLunar}
                onCheckedChange={toggleLunar}
                role="switch"
                aria-label="calendarType"
                {...methods.register("calendarType")}
                />
                <span>{dict.solar}</span>
            </div>

            <div>
              <Input placeholder="格式1996-11-21" {...methods.register("birthDate")} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
          <Label htmlFor="timeOfBirth">请选择出生时辰</Label>
          <Select {...methods.register("timeOfBirth")}>
            <SelectTrigger>
              <SelectValue placeholder="选择出生时辰" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="子时">子时 (23:00-1:00)</SelectItem>
              <SelectItem value="丑时">丑时 (1:00-3:00)</SelectItem>
              {/* ... other time options ... */}
            </SelectContent>
          </Select>
        </div>
        )}

        {currentStep === 3 && (
          <div>

            <Label htmlFor="location">请选择性别</Label>
            <span>{dict.male}</span>
              <Switch
              checked={isMale}
              onCheckedChange={toggleGender}
              role="switch"
              aria-label="gender"
              {...methods.register("gender")}
              />
              <span>{dict.female}</span>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <Label htmlFor="name">请输入姓名</Label>
            <Input placeholder="输入名字" {...methods.register("name")} />
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <Label htmlFor="location">请输入出生地</Label>
            <Input placeholder="输入位置" {...methods.register("location")} />
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button
            type="button"
            variant="secondary"
            onClick={() => onPreviousClick(setCurrentStep)}
          >
            上一步
          </Button>
          )}
          <Button 
          type="submit"
          onClick={() => console.log("Submit button clicked")}
          >
            {currentStep === 5 ? '提交' : '下一步'}
          </Button>
        </div>
      </form>
      <Meteors number={20} />
    </FormProvider>
</figure>
  );
}