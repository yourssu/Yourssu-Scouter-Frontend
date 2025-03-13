import { z } from 'zod';

export const DateSchema = z
  .string()
  .regex(
    /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/,
    '날짜는 yyyy.mm.dd 형식으로 입력해주세요',
  );

export const PhoneNumberSchema = z.string();

export const EmailSchema = z.string().refine(
  (email) => {
    // 더 포괄적인 이메일 정규식 패턴 사용
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  {
    message: '유효한 이메일 주소를 입력해주세요',
  },
);
