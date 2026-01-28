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
export type PositionFormValues = {
  id?: number;
  name: string;
  code?: string;
  rankLevel?: number | null;
  description?: string;
  status?: string;
};
type PositionFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PositionFormValues) => void;
  initialValues?: PositionFormValues | null;
  title?: string;
};
const defaultValues: PositionFormValues = {
  name: "",
  code: "",
  rankLevel: null,
  description: "",
  status: "ACTIVE",
};
const PositionFormModal: React.FC<PositionFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  title = "직책 등록",
}) => {
  const [form, setForm] = useState<PositionFormValues>(defaultValues);
  useEffect(() => {
    if (initialValues) {
      setForm({ ...defaultValues, ...initialValues });
    } else {
      setForm(defaultValues);
    }
  }, [initialValues, open]);
  const handleChange = (field: keyof PositionFormValues, value: any) => {
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
              label="직책명"
              fullWidth
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="코드"
              fullWidth
              value={form.code || ""}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="레벨"
              type="number"
              fullWidth
              value={form.rankLevel ?? ""}
              onChange={(e) =>
                handleChange(
                  "rankLevel",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="설명"
              fullWidth
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
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
export default PositionFormModal;