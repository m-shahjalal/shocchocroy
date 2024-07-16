import { toast } from '@/components/ui/use-toast';

import { handleAPIError } from './handle-error';

export type ErrorResponse = {
  success: false;
  error: {
    code: number;
    message: string;
  };
};

export type SuccessResponse<T> = { success: true; result: T };
export type Response<T> = Promise<SuccessResponse<T> | ErrorResponse>;

const toaster = (message: string, code: string | number) => {
  console.error(`Error ${code}: ${message}`);
  const description = message || 'Something went wrong';
  return toast({ title: `❗Error`, description });
};

export const serverAction = async <T>(callback: Promise<T>): Response<T> => {
  try {
    const result = await callback;
    return { success: true, result };
  } catch (error) {
    return handleAPIError(error);
  }
};

export const saveFetch = async <T>(
  pendingFetcher: Promise<ErrorResponse | SuccessResponse<T>>
): Promise<T | void> => {
  try {
    const response = await pendingFetcher;
    if (response.success) return response.result;

    toaster(response.error.message, response.error.code);
  } catch (error: any) {
    toaster(error.message, error.code);
  }
};
