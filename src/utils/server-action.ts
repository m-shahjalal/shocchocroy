import { handleError } from './handle-error';

type CallbackFunction<Params, T> = (params: Params) => Promise<T>;

export type ErrorResponse = {
  success: false;
  error: {
    code: number;
    message: string;
  };
};

export type SuccessResponse<T> = {
  success: true;
  result: T;
};

export const serverAction = async <Params, T>(
  params: Params,
  callback: CallbackFunction<Params, T>
): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const result = await callback(params);
    return { success: true, result };
  } catch (error) {
    return handleError(error);
  }
};