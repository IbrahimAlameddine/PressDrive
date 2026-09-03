import axios from "axios";

export interface IResponse<T = unknown> {
  status: number;
  message?: string;
  data?: T;
}

export const api = axios.create({
  baseURL: "/api",
});

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function handleResponse<T>(data: IResponse<T>): IResponse<T> {
  if (data?.status >= 400) {
    throw new ApiError(
      data.message || "Request failed",
      data.status,
      data.data
    );
  }

  return data;
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    throw new ApiError(
      data?.message || error.message || "Request failed",
      error.response?.status || 0,
      data
    );
  }

  if (error instanceof Error) {
    throw new ApiError(error.message, 0);
  }

  throw new ApiError("Request failed", 0);
}

export async function axiosGet<T>(
  path: string
): Promise<IResponse<T>> {
  try {
    const response = await api.get<IResponse<T>>(path);
    return handleResponse(response.data);
  } catch (error) {
    throw error instanceof ApiError ? error : handleError(error);
  }
}

export async function axiosPost<TRequest, TResponse>(
  path: string,
  data: TRequest
): Promise<IResponse<TResponse>> {
  try {
    const response = await api.post<IResponse<TResponse>>(path, data);
    return handleResponse(response.data);
  } catch (error) {
    throw error instanceof ApiError ? error : handleError(error);
  }
}

export async function axiosPut<TRequest, TResponse>(
  path: string,
  pathData: TRequest
): Promise<IResponse<TResponse>> {
  try {
    const response = await api.put<IResponse<TResponse>>(path, pathData);
    return handleResponse(response.data);
  } catch (error) {
    throw error instanceof ApiError ? error : handleError(error);
  }
}

export async function axiosDelete<T>(
  path: string
): Promise<IResponse<T>> {
  try {
    const response = await api.delete<IResponse<T>>(path);
    return handleResponse(response.data);
  } catch (error) {
    throw error instanceof ApiError ? error : handleError(error);
  }
}
