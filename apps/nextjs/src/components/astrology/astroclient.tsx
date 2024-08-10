// src/components/AstroPageClient.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Astrologyx } from "~/components/astrology/astrology";
import { AstrologyForm } from "~/components/astrology/astroform";

interface AstroPageClientProps {
  userId: string;
  dict: {
    form: any; // 根据实际类型调整
  };
}

function hasFilledForm(userId: string): boolean {
  if (typeof window === 'undefined') {
    return false; // 服务器端渲染时返回 false
  }
  try {
    const formStatus = localStorage.getItem(`userForm_${userId}`);
    return formStatus === 'completed';
  } catch (error) {
    console.error('Error checking if user has filled form:', error);
    return false;
  }
}

function setFormFilled(userId: string): void {
  if (typeof window === 'undefined') return; // 服务器端渲染时不执行
  try {
    localStorage.setItem(`userForm_${userId}`, 'completed');
  } catch (error) {
    console.error('Error setting form filled status:', error);
  }
}

export function AstroPageClient({ userId, dict }: AstroPageClientProps) {
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    setFormFilled(hasFilledForm(userId));
  }, [userId]);

  const handleFormSubmit = () => {
    setFormFilled(userId);
    setFormFilled(true);
  };

  return (
    <>
      {formFilled ? (
      <div className="App" style={{ width: 1024, margin: '10px auto', boxShadow: '0 0 25px rgba(0,0,0,0.25)'}}>
        <Astrologyx />
      </div>
      ) : (
        <AstrologyForm
          dict={dict.form}
          userId={userId}
          onFormSubmit={handleFormSubmit}
        />

      )}
    </>
  );
}