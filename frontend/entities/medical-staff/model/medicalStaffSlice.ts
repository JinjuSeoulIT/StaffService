"use client";
import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
/* ==============================
 * Types
 * ============================== */
export interface MedicalStaff {
  id: number;
  username?: string;
  email?: string;
  status?: string;
  domainRole?: string;
  fullName?: string;  
  officeLocation?: string;
  bio?: number;
  phone?: string;
}
export type MedicalStaffInput = Omit<
  MedicalStaff,
  "id" | "departmentName" | "positionName" | "profileImageUrl"
> & {
  profileImageFile?: File | null;
  departmentId?: number | null;
  positionId?: number | null;
};
export interface SearchCondition {
  condition: "name" | "department" | "position" | "staff_type" | "staff_id";
  value: string;
}
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  result?: T;
};
interface MedicalStaffState {
  items: MedicalStaff[];
  apiresponse: ApiResponse<MedicalStaff[] | MedicalStaff | void>;
  loading: boolean;
  error: string | undefined;
  imageUploadUrl?: string;
  imageUploading: boolean;
  imageUploadError?: string;
}
const initialState: MedicalStaffState = {
  items: [],
  apiresponse: { success: false, message: "", result: undefined },
  loading: false,
  error: undefined,
  imageUploadUrl: undefined,
  imageUploading: false,
  imageUploadError: undefined,
};
/* ==============================
 * Reducers
 * ============================== */
const fetchMedicalStaffRequestReducer: CaseReducer<MedicalStaffState> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const fetchMedicalStaffSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<MedicalStaff[]>
> = (state, action) => {
  state.loading = false;
  state.items = action.payload;
};
const fetchMedicalStaffFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const fetchMedicalStaffDetailRequestReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<number>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const fetchMedicalStaffDetailSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<MedicalStaff>
> = (state, action) => {
  state.loading = false;
  state.items = [action.payload];
};
const fetchMedicalStaffDetailFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const createMedicalStaffRequestReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<any>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const createMedicalStaffSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<MedicalStaff>
> = (state, action) => {
  state.loading = false;
  state.items.push(action.payload);
};
const createMedicalStaffFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const updateMedicalStaffRequestReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<{ id: number; data: MedicalStaffInput }>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const updateMedicalStaffSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<MedicalStaff>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.map((item) =>
    item.id === action.payload.id ? action.payload : item
  );
};
const updateMedicalStaffFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const deleteMedicalStaffRequestReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<number>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const deleteMedicalStaffSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<number>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.filter((item) => item.id !== action.payload);
};
const deleteMedicalStaffFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const fetchMedicalStaffByConditionRequestReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<SearchCondition>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const fetchMedicalStaffByConditionSuccessReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<MedicalStaff[]>
> = (state, action) => {
  state.loading = false;
  state.items = action.payload;
};
const fetchMedicalStaffByConditionFailureReducer: CaseReducer<
  MedicalStaffState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const medicalStaffSlice = createSlice({
  name: "medicalStaff",
  initialState,
  reducers: {
    fetchMedicalStaffRequest: fetchMedicalStaffRequestReducer,
    fetchMedicalStaffSuccess: fetchMedicalStaffSuccessReducer,
    fetchMedicalStaffFailure: fetchMedicalStaffFailureReducer,
    fetchMedicalStaffDetailRequest: fetchMedicalStaffDetailRequestReducer,
    fetchMedicalStaffDetailSuccess: fetchMedicalStaffDetailSuccessReducer,
    fetchMedicalStaffDetailFailure: fetchMedicalStaffDetailFailureReducer,
    createMedicalStaffRequest: createMedicalStaffRequestReducer,
    createMedicalStaffSuccess: createMedicalStaffSuccessReducer,
    createMedicalStaffFailure: createMedicalStaffFailureReducer,
    updateMedicalStaffRequest: updateMedicalStaffRequestReducer,
    updateMedicalStaffSuccess: updateMedicalStaffSuccessReducer,
    updateMedicalStaffFailure: updateMedicalStaffFailureReducer,
    deleteMedicalStaffRequest: deleteMedicalStaffRequestReducer,
    deleteMedicalStaffSuccess: deleteMedicalStaffSuccessReducer,
    deleteMedicalStaffFailure: deleteMedicalStaffFailureReducer,
    fetchMedicalStaffByConditionRequest: fetchMedicalStaffByConditionRequestReducer,
    fetchMedicalStaffByConditionSuccess: fetchMedicalStaffByConditionSuccessReducer,
    fetchMedicalStaffByConditionFailure: fetchMedicalStaffByConditionFailureReducer,
  },
});
export const {
  fetchMedicalStaffRequest,
  fetchMedicalStaffSuccess,
  fetchMedicalStaffFailure,
  fetchMedicalStaffDetailRequest,
  fetchMedicalStaffDetailSuccess,
  fetchMedicalStaffDetailFailure,
  createMedicalStaffRequest,
  createMedicalStaffSuccess,
  createMedicalStaffFailure,
  updateMedicalStaffRequest,
  updateMedicalStaffSuccess,
  updateMedicalStaffFailure,
  deleteMedicalStaffRequest,
  deleteMedicalStaffSuccess,
  deleteMedicalStaffFailure,
  fetchMedicalStaffByConditionRequest,
  fetchMedicalStaffByConditionSuccess,
  fetchMedicalStaffByConditionFailure,
} = medicalStaffSlice.actions;
export default medicalStaffSlice.reducer;