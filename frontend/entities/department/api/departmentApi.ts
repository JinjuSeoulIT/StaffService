"use client";
import axios, { AxiosResponse } from "axios";
import type {
  ApiResponse,
  Department,
  DepartmentInput,
} from "../model/departmentSlice";
const DEPARTMENT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "http://192.168.1.67:3001/api/jpa/departments";
function handleResponse<T>(res: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
  if (res.data.success) return res.data;
  return { message: res.data.message, success: false };
}
// 전체 조회
export async function fetchDepartmentsApi(): Promise<ApiResponse<Department[]>> {
  const res = await axios.get<ApiResponse<Department[]>>(DEPARTMENT_API_BASE);
  return handleResponse(res);
}
// 단건 조회
export async function fetchDepartmentApi(
  id: number
): Promise<ApiResponse<Department>> {
  const res = await axios.get<ApiResponse<Department>>(
    `${DEPARTMENT_API_BASE}/${id}`
  );
  return handleResponse(res);
}
// 생성
export async function createDepartmentApi(
  data: DepartmentInput
): Promise<ApiResponse<Department>> {
  const res = await axios.post<ApiResponse<Department>>(DEPARTMENT_API_BASE, data);
  return handleResponse(res);
}
// 수정
export async function updateDepartmentApi(
  id: number,
  data: DepartmentInput
): Promise<ApiResponse<Department>> {
  const res = await axios.put<ApiResponse<Department>>(
    `${DEPARTMENT_API_BASE}/${id}`,
    data
  );
  return handleResponse(res);
}
// 삭제
export async function deleteDepartmentApi(
  id: number
): Promise<ApiResponse<null>> {
  const res = await axios.delete<ApiResponse<null>>(
    `${DEPARTMENT_API_BASE}/${id}`
  );
  return handleResponse(res);
}