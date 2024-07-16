import { ErrorResponse } from './fetch-formation';

export const handleAPIError = (
  error: { code?: number; message?: string } | unknown
): ErrorResponse => {
  if (
    typeof error === 'object' &&
    error !== null &&
    ('code' in error || 'message' in error)
  ) {
    const { code, message } = error as { code?: number; message?: string };
    return {
      success: false,
      error: {
        code: code ?? 500,
        message: message ?? 'An error occurred',
      },
    };
  }

  // If error is not an instance of Error or Object, assume it's unknown
  return {
    success: false,
    error: {
      code: 500,
      message: (error as any).message ?? 'An error occurred',
    },
  };
};
