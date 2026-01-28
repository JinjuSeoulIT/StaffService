import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
export type MedicalStaffDetail = {
  id?: number;
  staffId?: string;
  name?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  hireDate?: string;
  departmentName?: string;
  positionName?: string;
  status?: string;
  profileImageUrl?: string;
  staffType?: string;
  licenseNumber?: string;
  specialty?: string;
  grade?: string;
  certification?: string;
  field?: string;
};
type MedicalStaffDetailModalProps = {
  open: boolean;
  onClose: () => void;
  data?: MedicalStaffDetail | null;
};
const MedicalStaffDetailModal: React.FC<MedicalStaffDetailModalProps> = ({
  open,
  onClose,
  data,
}) => {
  if (!data) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>의료진 상세</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            {data.profileImageUrl && (
              <img
                src={data.profileImageUrl}
                alt="profile"
                style={{ maxWidth: 120, borderRadius: 8 }}
                onClick={()=>window.open(data.profileImageUrl)}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography>직원 ID: {data.staffId}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>이름: {data.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>성별: {data.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>생년월일: {data.birthDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>연락처: {data.phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>이메일: {data.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>입사일: {data.hireDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>재직 상태: {data.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>부서: {data.departmentName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>직책: {data.positionName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1">전문 정보</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>직군: {data.staffType}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>면허번호: {data.licenseNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>전문분야: {data.specialty}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>간호등급: {data.grade}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>자격증: {data.certification}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>분야: {data.field}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};
export default MedicalStaffDetailModal;