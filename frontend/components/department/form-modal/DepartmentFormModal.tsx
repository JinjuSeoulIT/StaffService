"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
export type DepartmentFormValues = {
  id?: number;
  name: string;
  buildingNo?: string;
  floorNo?: string;
  roomNo?: string;
  headMedicalStaffId?: number | null;
  extension?: string;
  status?: string;
};
type DepartmentFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: DepartmentFormValues) => void;
  initialValues?: DepartmentFormValues | null;
  title?: string;
};
const defaultValues: DepartmentFormValues = {
  name: "",
  buildingNo: "",
  floorNo: "",
  roomNo: "",
  headMedicalStaffId: null,
  extension: "",
  status: "ACTIVE",
};
const DepartmentFormModal: React.FC<DepartmentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  title = "부서 등록",
}) => {
  const [form, setForm] = useState<DepartmentFormValues>(defaultValues);
  useEffect(() => {
    if (initialValues) {
      setForm({
        ...defaultValues,
        ...initialValues,
      });
    } else {
      setForm(defaultValues);
    }
  }, [initialValues, open]);
  const handleChange = (field: keyof DepartmentFormValues, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSubmit(form);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="부서명"
              fullWidth
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="건물"
              fullWidth
              value={form.buildingNo || ""}
              onChange={(e) => handleChange("buildingNo", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="층"
              fullWidth
              value={form.floorNo || ""}
              onChange={(e) => handleChange("floorNo", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="호실"
              fullWidth
              value={form.roomNo || ""}
              onChange={(e) => handleChange("roomNo", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="내선번호"
              fullWidth
              value={form.extension || ""}
              onChange={(e) => handleChange("extension", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="부서장 의료진 ID"
              fullWidth
              type="number"
              value={form.headMedicalStaffId ?? ""}
              onChange={(e) =>
                handleChange(
                  "headMedicalStaffId",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="상태"
              fullWidth
              value={form.status || "ACTIVE"}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DepartmentFormModal;