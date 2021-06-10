import { ApiError } from './api-error';

export class GeneralResponse {
  data: any;
  success: boolean;
  message: string;
  apiError: ApiError;
}
