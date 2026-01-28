import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
export type MedicalStaffFormValues = {
  id?: number;
  staffId: string;
  name: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  hireDate?: string;
  departmentId?: number | null;
  positionId?: number | null;
  status?: string;
  profileImageFile?: File | null;
};
export type SimpleOption = {
  id: number;
  name: string;
};
type MedicalStaffFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: MedicalStaffFormValues) => void;
  initialValues?: MedicalStaffFormValues | null;
  departments?: SimpleOption[];
  positions?: SimpleOption[];
  title?: string;
};
const defaultValues: MedicalStaffFormValues = {
  staffId: "",
  name: "",
  gender: "",
  birthDate: "",
  phone: "",
  email: "",
  hireDate: "",
  departmentId: null,
  positionId: null,
  status: "ACTIVE",
  profileImageFile: null,
};
const MedicalStaffFormModal: React.FC<MedicalStaffFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  departments = [],
  positions = [],
  title = "의료진 등록",
}) => {
  const [form, setForm] = useState<MedicalStaffFormValues>(defaultValues);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmImage, setConfirmImage] = useState(false);
  useEffect(() => {
    if (initialValues) {
      setForm({ ...defaultValues, ...initialValues, profileImageFile: null });
      setPreviewUrl(null);
    } else {
      setForm(defaultValues);
      setPreviewUrl(null);
    }
    setConfirmImage(false);
  }, [initialValues, open]);
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const handleChange = (field: keyof MedicalStaffFormValues, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (file: File | null) => {
    handleChange("profileImageFile", file);
    setConfirmImage(false);
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };
  const handleSubmit = () => {
    if (!form.staffId.trim() || !form.name.trim()) return;
    if (form.profileImageFile && !confirmImage) return;
    onSubmit(form);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  bgcolor: "grey.50",
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    미리보기 없음
                  </Typography>
                )}
              </Box>
              <Box>
                <Button variant="outlined" component="label">
                  프로필 이미지 선택
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] ?? null)
                    }
                  />
                </Button>
                {form.profileImageFile && (
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {form.profileImageFile.name}
                  </Typography>
                )}
                {form.profileImageFile && (
                  <FormControlLabel
                    sx={{ display: "block", mt: 1 }}
                    control={
                      <Checkbox
                        checked={confirmImage}
                        onChange={(e) => setConfirmImage(e.target.checked)}
                      />
                    }
                    label="올린 사진이 맞습니다."
                  />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="직원 ID"
              fullWidth
              required
              value={form.staffId}
              onChange={(e) => handleChange("staffId", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="이름"
              fullWidth
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="성별"
              fullWidth
              value={form.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="생년월일"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.birthDate || ""}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="입사일"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.hireDate || ""}
              onChange={(e) => handleChange("hireDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="연락처"
              fullWidth
              value={form.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="이메일"
              fullWidth
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="부서"
              fullWidth
              value={form.departmentId ?? ""}
              onChange={(e) =>
                handleChange(
                  "departmentId",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <MenuItem value="">선택 안함</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="직책"
              fullWidth
              value={form.positionId ?? ""}
              onChange={(e) =>
                handleChange(
                  "positionId",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <MenuItem value="">선택 안함</MenuItem>
              {positions.map((pos) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="재직 상태"
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
export default MedicalStaffFormModal;