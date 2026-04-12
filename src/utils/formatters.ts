export const formatNumber = (
  value: number,
  decimals: number = 0,
  prefix: string = '',
  suffix: string = ''
): string => {
  return `${prefix}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
};
