import AppError from '@shared/errors/AppError';

export default function validateResponseSP(keySP: string, data: any) {
  if (!data) {
    return new AppError({ message: 'The formatting of the response is incorrect' });
  }

  if (!Array.isArray(data)) {
    return new AppError({ message: 'The formatting of the response is incorrect' });
  }
  if (data.length <= 0) {
    return new AppError({ message: 'The formatting of the response is incorrect' });
  }

  if (!Boolean(data[0][keySP])) {
    return new AppError({ message: 'The formatting of the response is incorrect' });
  }

  return data[0][keySP];
}
