export const getDisplayValue = (
  value: string | undefined,
  defaultValue: string = 'Not Available'
) => {
  return value && value !== 'N/A' ? value : defaultValue;
};
