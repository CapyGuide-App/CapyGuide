const hexToRGBA = (hex: string, opacity: number) => {
    hex = hex.replace('#', '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const normalizeString = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const formatNumber = (num: number): number => {
    const numTmp = Math.round(num * 10) / 10;

    if (numTmp >= 10)
        return Math.floor(numTmp);
    return numTmp;
};

import { formatDistanceToNow, differenceInHours, differenceInDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';

const formatRelativeTime = (date: Date | number): string => {
  const now = new Date();

  // Tính số giờ và số ngày giữa hai thời điểm
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  // Logic hiển thị
  if (hoursDiff < 1) {
    // Hiển thị "x phút trước" nếu dưới 1 giờ
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  } else if (hoursDiff < 24) {
    // Hiển thị "x giờ trước" nếu dưới 24 giờ
    return `${hoursDiff} giờ trước`;
  } else if (daysDiff <= 3) {
    // Hiển thị "x ngày trước" nếu trong vòng 3 ngày
    return `${daysDiff} ngày trước`;
  } else {
    // Hiển thị ngày tháng năm nếu trên 3 ngày
    return format(date, 'dd/MM/yyyy', { locale: vi });
  }
};

export { hexToRGBA, normalizeString, formatNumber, formatRelativeTime };