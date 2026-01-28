"use client";
import axios, { AxiosResponse } from "axios";
import type {
  ApiResponse,
  MedicalStaff,
  MedicalStaffInput,
  SearchCondition,
} from "../model/medicalStaffSlice";
/* =========================
 * API BASE
 * ========================= */
const MEDICAL_STAFF_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "http://192.168.1.67:3001/api/jpa/medical-staff";
/* =========================
 * 공통 유틸
 * ========================= */
function handleResponse<T>(res: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
  if (res.data.success) {
    return res.data;
  }
  return {
    message: res.data.message,
    success: false,
  };
}
/* =========================
 * MedicalStaff APIs
 * ========================= */
// 전체 조회
export async function fetchMedicalStaffApi(): Promise<ApiResponse<MedicalStaff[]>> {
  const res = await axios.get<ApiResponse<MedicalStaff[]>>(MEDICAL_STAFF_API_BASE);
  return handleResponse(res);
}
// 조건 조회
export async function fetchMedicalStaffByConditionApi(
  data: SearchCondition
): Promise<ApiResponse<MedicalStaff | MedicalStaff[]>> {
  const { condition, value } = data;
  const url = `${MEDICAL_STAFF_API_BASE}/search`; // 변경: base 포함
  const res = await axios.get<ApiResponse<MedicalStaff | MedicalStaff[]>>(url, {
    params: { condition, value },
  });
  return handleResponse(res);
}
// 단건 조회
export async function fetchMedicalStaffDetailApi(
  id: number
): Promise<ApiResponse<MedicalStaff>> {
  const res = await axios.get<ApiResponse<MedicalStaff>>(
    `${MEDICAL_STAFF_API_BASE}/${id}` // 변경: id 경로
  );
  return handleResponse(res);
}
// 생성 (multipart)
export async function createMedicalStaffApi(formData: FormData) {
  return axios.post(MEDICAL_STAFF_API_BASE, formData, {
    headers: {
      // "Content-Type": "multipart/form-data",
    },
  });
}
// 수정
export async function updateMedicalStaffApi(
  id: number,
  data: MedicalStaffInput
): Promise<ApiResponse<MedicalStaff>> {
  const res = await axios.put<ApiResponse<MedicalStaff>>(
    `${MEDICAL_STAFF_API_BASE}/${id}`, // 변경: id 경로
    data
  );
  return handleResponse(res);
}
// 삭제
export async function deleteMedicalStaffApi(
  id: number
): Promise<ApiResponse<null>> {
  const res = await axios.delete<ApiResponse<null>>(
    `${MEDICAL_STAFF_API_BASE}/${id}` // 변경: id 경로
  );
  return handleResponse(res);
}