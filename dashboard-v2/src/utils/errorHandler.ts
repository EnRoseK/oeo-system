import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error: unknown, message?: string) => {
  if (!message) {
    message = 'Тодорхойгүй алдаа гарлаа! Та дахин оролдоно уу!';
  }

  if (isAxiosError(error)) {
    toast.error(
      (error.response?.data?.error?.message || message)
        .replaceAll('Email already taken', 'И-мэйл бүртгэлтэй байна')
        .replaceAll('Username already taken', 'Хэрэглэгчийн нэр бүртгэлтэй байна'),
    );
  } else {
    toast.error(message);
  }
};
