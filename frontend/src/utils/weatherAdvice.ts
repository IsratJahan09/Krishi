/**
 * Generate Bangla weather advisories based on conditions
 */
export interface WeatherCondition {
  temperature: number;
  humidity: number;
  rainProbability: number;
}

export const getWeatherAdvice = (condition: WeatherCondition): string => {
  const { temperature, humidity, rainProbability } = condition;

  // High rain probability
  if (rainProbability > 60) {
    if (rainProbability > 80) {
      return "আগামী ২৪ ঘণ্টায় ভারী বৃষ্টি সম্ভব। ফসল ঘরে নিয়ে আসুন এবং শুকনো জায়গায় রাখুন। ধান ও গম ঢেকে রাখুন।";
    }
    return "আগামী ৩ দিন বৃষ্টির সম্ভাবনা। ফসল ঢেকে রাখুন এবং জলনিকাশি ব্যবস্থা পরীক্ষা করুন। ধান শুকানোর কাজ স্থগিত রাখুন।";
  }

  // High temperature
  if (temperature > 35) {
    if (humidity < 40) {
      return "উচ্চ তাপমাত্রা ও কম আর্দ্রতা। ফসল ছায়ায় শুকান এবং সরাসরি রোদে রাখবেন না। ঘন ঘন পানি দিন।";
    }
    return "তাপমাত্রা ৩৫°C এর বেশি। ফসল ভেতরে বা ছায়ায় রাখুন। দুপুরে কাজ এড়িয়ে চলুন।";
  }

  // High humidity
  if (humidity > 80) {
    return "উচ্চ আর্দ্রতা। ফসলে ছত্রাকের ঝুঁকি। ভালো বায়ুচলাচল নিশ্চিত করুন এবং ফসল ঘন করে রাখবেন না।";
  }

  // Moderate humidity with moderate temperature
  if (humidity > 60 && temperature > 28 && temperature < 35) {
    return "আর্দ্র ও উষ্ণ আবহাওয়া। ফসল দ্রুত শুকিয়ে নিন। সংরক্ষণে সতর্ক থাকুন।";
  }

  // Low temperature
  if (temperature < 15) {
    return "তাপমাত্রা কম। ফসল ঠান্ডা থেকে রক্ষা করুন। সংরক্ষণাগারে তাপমাত্রা পরীক্ষা করুন।";
  }

  // Ideal conditions
  if (temperature >= 20 && temperature <= 30 && humidity >= 40 && humidity <= 70 && rainProbability < 30) {
    return "আবহাওয়া অনুকূল। ফসল শুকানো ও সংরক্ষণের জন্য ভালো সময়। বাইরে শুকানোর কাজ করতে পারেন।";
  }

  // Default advice
  return "আবহাওয়া পরিবর্তনশীল। নিয়মিত পূর্বাভাস দেখুন এবং ফসল পরীক্ষা করুন।";
};

/**
 * Get Bangla day name
 */
export const getBanglaDayName = (date: Date): string => {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[date.getDay()];
};

/**
 * Get Bangla month name
 */
export const getBanglaMonthName = (date: Date): string => {
  const months = [
    'জানুয়ারী',
    'ফেব্রুয়ারী',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];
  return months[date.getMonth()];
};
