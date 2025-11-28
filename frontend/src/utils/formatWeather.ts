import { toBanglaNumber } from "./banglaNumber";

/**
 * Weather utility functions for Bangla formatting
 */

export const getBanglaWeatherCondition = (condition: string): string => {
  const conditions: { [key: string]: string } = {
    'clear': 'পরিষ্কার',
    'clouds': 'মেঘলা',
    'rain': 'বৃষ্টি',
    'drizzle': 'গুঁড়ি গুঁড়ি বৃষ্টি',
    'thunderstorm': 'বজ্রঝড়',
    'snow': 'তুষারপাত',
    'mist': 'কুয়াশা',
    'fog': 'ঘন কুয়াশা',
    'haze': 'ধোঁয়াশা',
    'partly cloudy': 'আংশিক মেঘলা',
    'overcast': 'ঘন মেঘ',
  };
  
  return conditions[condition.toLowerCase()] || condition;
};

export const getBanglaDay = (date: Date): string => {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[date.getDay()];
};

export const getBanglaMonth = (date: Date): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  return months[date.getMonth()];
};

export const formatBanglaDate = (date: Date): string => {
  const day = toBanglaNumber(date.getDate());
  const month = getBanglaMonth(date);
  const year = toBanglaNumber(date.getFullYear());
  return `${day} ${month}, ${year}`;
};

export const getWeatherAdviceMessage = (
  temp: number,
  humidity: number,
  rainProb: number
): string => {
  if (rainProb > 70) {
    return "আগামীকাল ভারী বৃষ্টি হতে পারে। ধান ঢেকে রাখুন এবং শুকানোর কাজ স্থগিত রাখুন।";
  }
  
  if (temp > 35) {
    return "তাপমাত্রা বেশি। ফসল ভেতরে বা ছায়ায় শুকানো উত্তম। দুপুরে কাজ এড়িয়ে চলুন।";
  }
  
  if (humidity > 80) {
    return "উচ্চ আর্দ্রতা। ফসলে ছত্রাকের ঝুঁকি। ভালো বায়ুচলাচল নিশ্চিত করুন।";
  }
  
  if (rainProb > 40 && rainProb <= 70) {
    return "বৃষ্টির সম্ভাবনা আছে। ফসল ঢেকে রাখার প্রস্তুতি নিন।";
  }
  
  if (temp >= 25 && temp <= 32 && humidity < 70 && rainProb < 30) {
    return "আবহাওয়া অনুকূল। ফসল শুকানো ও সংরক্ষণের জন্য ভালো সময়।";
  }
  
  return "আবহাওয়া পরিবর্তনশীল। নিয়মিত পূর্বাভাস দেখুন এবং ফসল পরীক্ষা করুন।";
};
