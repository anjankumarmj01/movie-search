import { NOT_AVAILABLE, NOT_APPLIED } from '../constants/constants';

export const getDisplayValue = (
  value: string | undefined,
  defaultValue: string = NOT_AVAILABLE
) => {
  return value && value !== NOT_APPLIED ? value : defaultValue;
};
