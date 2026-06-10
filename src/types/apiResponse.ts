export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface TableResponseApi<T>{
  headers: string[];
  data: T[]
}
