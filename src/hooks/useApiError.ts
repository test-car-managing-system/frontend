import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface TCustomErrorResponse {
  success: boolean;
  status: number;
  code: string;
  reason: string;
  timeStamp: string;
  path: string;
}

const useApiError = () => {
  const navigate = useNavigate();

  const handleError = useCallback((axiosError: AxiosError) => {
    const errorResponse = axiosError.response?.data as TCustomErrorResponse;
    const { errorSort, status, errorIndex } = codeSpliter(errorResponse);

    switch (status) {
      // BadRequestException | ValidationError
      case 400:
      case 404:
      case 500:
        break;
      // authentication error
      case 401:
      case 403:
        navigate('/auth/login');
        break;
      default:
        console.log('500');
        break;
    }
  }, []);
  return { handleError } as const;
};

export default useApiError;

const codeSpliter = (errorResponse: TCustomErrorResponse) => {
  const { status, code } = errorResponse;
  const codeInfo = code.split('_'); // Event, ... , 400, 1
  const errorSort = codeInfo.slice(0, codeInfo.length - 2).join('_');
  const errorIndex = codeInfo[codeInfo.length - 1];
  return { errorSort, status, errorIndex };
};
