/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

interface ValidationError {
  path: string;
  type: string;
  message: string;
  inner: ValidationError[];
}

const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: unknown) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: Record<string, { type: string; message: string }>, currentError: ValidationError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
