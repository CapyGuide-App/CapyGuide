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

export { hexToRGBA, normalizeString, formatNumber };