"use client";
import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
export interface Position {
  id: number;
  name: string;
  code?: string;
  rankLevel?: number | null;
  description?: string;
  status?: string;
}
export type PositionInput = Omit<Position, "id">;
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  result?: T;
};
interface PositionState {
  items: Position[];
  apiresponse: ApiResponse<Position[] | Position | void>;
  loading: boolean;
  error?: string;
}
const initialState: PositionState = {
  items: [],
  apiresponse: { success: false, message: "", result: undefined },
  loading: false,
  error: undefined,
};
const fetchPositionsRequestReducer: CaseReducer<PositionState> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const fetchPositionsSuccessReducer: CaseReducer<
  PositionState,
  PayloadAction<Position[]>
> = (state, action) => {
  state.loading = false;
  state.items = action.payload;
};
const fetchPositionsFailureReducer: CaseReducer<
  PositionState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const createPositionRequestReducer: CaseReducer<
  PositionState,
  PayloadAction<PositionInput>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const createPositionSuccessReducer: CaseReducer<
  PositionState,
  PayloadAction<Position>
> = (state, action) => {
  state.loading = false;
  state.items.push(action.payload);
};
const createPositionFailureReducer: CaseReducer<
  PositionState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const updatePositionRequestReducer: CaseReducer<
  PositionState,
  PayloadAction<{ id: number; data: PositionInput }>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const updatePositionSuccessReducer: CaseReducer<
  PositionState,
  PayloadAction<Position>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.map((item) =>
    item.id === action.payload.id ? action.payload : item
  );
};
const updatePositionFailureReducer: CaseReducer<
  PositionState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const deletePositionRequestReducer: CaseReducer<
  PositionState,
  PayloadAction<number>
> = (state) => {
  state.loading = true;
  state.error = undefined;
};
const deletePositionSuccessReducer: CaseReducer<
  PositionState,
  PayloadAction<number>
> = (state, action) => {
  state.loading = false;
  state.items = state.items.filter((item) => item.id !== action.payload);
};
const deletePositionFailureReducer: CaseReducer<
  PositionState,
  PayloadAction<string>
> = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    fetchPositionsRequest: fetchPositionsRequestReducer,
    fetchPositionsSuccess: fetchPositionsSuccessReducer,
    fetchPositionsFailure: fetchPositionsFailureReducer,
    createPositionRequest: createPositionRequestReducer,
    createPositionSuccess: createPositionSuccessReducer,
    createPositionFailure: createPositionFailureReducer,
    updatePositionRequest: updatePositionRequestReducer,
    updatePositionSuccess: updatePositionSuccessReducer,
    updatePositionFailure: updatePositionFailureReducer,
    deletePositionRequest: deletePositionRequestReducer,
    deletePositionSuccess: deletePositionSuccessReducer,
    deletePositionFailure: deletePositionFailureReducer,
  },
});
export const {
  fetchPositionsRequest,
  fetchPositionsSuccess,
  fetchPositionsFailure,
  createPositionRequest,
  createPositionSuccess,
  createPositionFailure,
  updatePositionRequest,
  updatePositionSuccess,
  updatePositionFailure,
  deletePositionRequest,
  deletePositionSuccess,
  deletePositionFailure,
} = positionSlice.actions;
export default positionSlice.reducer;