"use client";
import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
export interface Department {
  id: number;
  name: string;
  buildingNo?: string;
  floorNo?: string;
  roomNo?: string;
  headMedicalStaffId?: number | null;
  extension?: string;
  status?: string;
}
export type DepartmentInput = Omit<Department, "id">;
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  result?: T;
};
interface DepartmentState {
  items: Department[];
  apiresponse: ApiResponse<Department[] | Department | void>;
  loading: boolean;
  error?: string;
}
const initialState: DepartmentState = {
  items: [],
  apiresponse: { success: false, message: "", result: undefined },
  loading: false,
  error: undefined,
};
const fetchDepartmentsRequestReducer: CaseReducer<DepartmentState> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const fetchDepartmentsSuccessReducer: CaseReducer<
  DepartmentState,
  PayloadAction<Department[]>
> = (state, action) => {
  state.loading = false;
  state.items = action.payload;
};
const fetchDepartmentsFailureReducer: CaseReducer<
  DepartmentState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const createDepartmentRequestReducer: CaseReducer<
  DepartmentState,
  PayloadAction<DepartmentInput>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const createDepartmentSuccessReducer: CaseReducer<
  DepartmentState,
  PayloadAction<Department>
> = (state, action) => {
  state.loading = false;
  state.items.push(action.payload);
};
const createDepartmentFailureReducer: CaseReducer<
  DepartmentState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const updateDepartmentRequestReducer: CaseReducer<
  DepartmentState,
  PayloadAction<{ id: number; data: DepartmentInput }>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const updateDepartmentSuccessReducer: CaseReducer<
  DepartmentState,
  PayloadAction<Department>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.map((item) =>
    item.id === action.payload.id ? action.payload : item
  );
};
const updateDepartmentFailureReducer: CaseReducer<
  DepartmentState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const deleteDepartmentRequestReducer: CaseReducer<
  DepartmentState,
  PayloadAction<number>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const deleteDepartmentSuccessReducer: CaseReducer<
  DepartmentState,
  PayloadAction<number>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.filter((item) => item.id !== action.payload);
};
const deleteDepartmentFailureReducer: CaseReducer<
  DepartmentState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    fetchDepartmentsRequest: fetchDepartmentsRequestReducer,
    fetchDepartmentsSuccess: fetchDepartmentsSuccessReducer,
    fetchDepartmentsFailure: fetchDepartmentsFailureReducer,
    createDepartmentRequest: createDepartmentRequestReducer,
    createDepartmentSuccess: createDepartmentSuccessReducer,
    createDepartmentFailure: createDepartmentFailureReducer,
    updateDepartmentRequest: updateDepartmentRequestReducer,
    updateDepartmentSuccess: updateDepartmentSuccessReducer,
    updateDepartmentFailure: updateDepartmentFailureReducer,
    deleteDepartmentRequest: deleteDepartmentRequestReducer,
    deleteDepartmentSuccess: deleteDepartmentSuccessReducer,
    deleteDepartmentFailure: deleteDepartmentFailureReducer,
  },
});
export const {
  fetchDepartmentsRequest,
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
  createDepartmentRequest,
  createDepartmentSuccess,
  createDepartmentFailure,
  updateDepartmentRequest,
  updateDepartmentSuccess,
  updateDepartmentFailure,
  deleteDepartmentRequest,
  deleteDepartmentSuccess,
  deleteDepartmentFailure,
} = departmentSlice.actions;
export default departmentSlice.reducer;