"use client";
import axios, { AxiosResponse } from "axios";
import type {
  ApiResponse,
  Position,
  PositionInput,
} from "../model/positionSlice";
const POSITION_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "http://192.168.1.67:3001/api/jpa/positions";
function handleResponse<T>(res: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
  if (res.data.success) return res.data;
  return { message: res.data.message, success: false };
}
// 전체 조회
export async function fetchPositionsApi(): Promise<ApiResponse<Position[]>> {
  const res = await axios.get<ApiResponse<Position[]>>(POSITION_API_BASE);
  return handleResponse(res);
}
// 단건 조회
export async function fetchPositionApi(
  id: number
): Promise<ApiResponse<Position>> {
  const res = await axios.get<ApiResponse<Position>>(
    `${POSITION_API_BASE}/${id}`
  );
  return handleResponse(res);
}
// 생성
export async function createPositionApi(
  data: PositionInput
): Promise<ApiResponse<Position>> {
  const res = await axios.post<ApiResponse<Position>>(POSITION_API_BASE, data);
  return handleResponse(res);
}
// 수정
export async function updatePositionApi(
  id: number,
  data: PositionInput
): Promise<ApiResponse<Position>> {
  const res = await axios.put<ApiResponse<Position>>(
    `${POSITION_API_BASE}/${id}`,
    data
  );
  return handleResponse(res);
}
// 삭제
export async function deletePositionApi(
  id: number
): Promise<ApiResponse<null>> {
  const res = await axios.delete<ApiResponse<null>>(
    `${POSITION_API_BASE}/${id}`
  );
  return handleResponse(res);
}