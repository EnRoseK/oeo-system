import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error: unknown, message?: string) => {
  if (!message) {
    message = 'Тодорхойгүй алдаа гарлаа! Та дахин оролдоно уу!';
  }

  if (isAxiosError(error)) {
    toast.error(error.response?.data?.error || message);
  } else {
    toast.error(message);
  }
};
