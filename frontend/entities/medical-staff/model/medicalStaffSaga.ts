"use client";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createMedicalStaffApi,
  deleteMedicalStaffApi,
  fetchMedicalStaffApi,
  fetchMedicalStaffByConditionApi,
  fetchMedicalStaffDetailApi,
  updateMedicalStaffApi,
} from "../api/medicalStaffApi";
import {
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
  type ApiResponse,
  type MedicalStaff,
  type MedicalStaffInput,
  type SearchCondition,
} from "./medicalStaffSlice";
const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return "Unknown error";
};
function* fetchMedicalStaffWorker() {
  try {
    const ApiResponse: ApiResponse<MedicalStaff[]> = yield call(fetchMedicalStaffApi);
    if (ApiResponse.success && ApiResponse.result) {
      yield put(fetchMedicalStaffSuccess(ApiResponse.result));
    } else {
      yield put(fetchMedicalStaffFailure(ApiResponse.message));
    }
  } catch (err: unknown) {
    yield put(fetchMedicalStaffFailure(getErrorMessage(err)));
  }
}
function* fetchMedicalStaffDetailWorker(action: PayloadAction<number>) {
  try {
    const ApiResponse: ApiResponse<MedicalStaff> = yield call(
      fetchMedicalStaffDetailApi,
      action.payload
    );
    if (ApiResponse.success && ApiResponse.result) {
      yield put(fetchMedicalStaffDetailSuccess(ApiResponse.result));
    } else {
      yield put(fetchMedicalStaffDetailFailure(ApiResponse.message));
    }
  } catch (err: unknown) {
    yield put(fetchMedicalStaffDetailFailure(getErrorMessage(err)));
  }
}
function* createMedicalStaffWorker(action: PayloadAction<any>) {
  try {
    const res = yield call(createMedicalStaffApi, action.payload);

    if (res?.data?.success && res?.data?.result) 
      {
      yield put(createMedicalStaffSuccess(res.data.result));
      yield put(fetchMedicalStaffRequest())
    }
    else 
      {
      yield put(createMedicalStaffFailure(res?.data?.message || "Create failed"));
    }
  } 
  catch (err: unknown) {
    yield put(createMedicalStaffFailure(getErrorMessage(err)));
  }
}
function* updateMedicalStaffWorker(
  action: PayloadAction<{ id: number; data: MedicalStaffInput }>
) {
  try {
    const ApiResponse: ApiResponse<MedicalStaff> = yield call(
      updateMedicalStaffApi,
      action.payload.id,
      action.payload.data
    );
    if (ApiResponse.success && ApiResponse.result) {
      yield put(updateMedicalStaffSuccess(ApiResponse.result));
    } else {
      yield put(updateMedicalStaffFailure(ApiResponse.message));
    }
  } catch (err: unknown) {
    yield put(updateMedicalStaffFailure(getErrorMessage(err)));
  }
}
function* deleteMedicalStaffWorker(action: PayloadAction<number>) {
  try {
    const ApiResponse: ApiResponse<void> = yield call(
      deleteMedicalStaffApi,
      action.payload
    );
    if (ApiResponse.success) {
      yield put(deleteMedicalStaffSuccess(action.payload));
    } else {
      yield put(deleteMedicalStaffFailure(ApiResponse.message));
    }
  } catch (err: unknown) {
    yield put(deleteMedicalStaffFailure(getErrorMessage(err)));
  }
}
function* fetchMedicalStaffByConditionWorker(
  action: PayloadAction<SearchCondition>
) {
  try {
    const ApiResponse: ApiResponse<MedicalStaff[]> = yield call(
      fetchMedicalStaffByConditionApi,
      action.payload
    );
    if (ApiResponse.success && ApiResponse.result) {
      yield put(fetchMedicalStaffByConditionSuccess(ApiResponse.result));
    } else {
      yield put(fetchMedicalStaffByConditionFailure(ApiResponse.message));
    }
  } catch (err: unknown) {
    yield put(fetchMedicalStaffByConditionFailure(getErrorMessage(err)));
  }
}
export function* medicalStaffSaga() {
  yield takeLatest(fetchMedicalStaffRequest.type, fetchMedicalStaffWorker);
  yield takeLatest(fetchMedicalStaffDetailRequest.type, fetchMedicalStaffDetailWorker);
  yield takeLatest(createMedicalStaffRequest.type, createMedicalStaffWorker);
  yield takeLatest(updateMedicalStaffRequest.type, updateMedicalStaffWorker);
  yield takeLatest(deleteMedicalStaffRequest.type, deleteMedicalStaffWorker);
  yield takeLatest(fetchMedicalStaffByConditionRequest.type, fetchMedicalStaffByConditionWorker);
}