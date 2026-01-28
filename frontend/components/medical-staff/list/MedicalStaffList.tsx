"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  MenuItem,
} from "@mui/material";
import MedicalStaffFormModal, {
  MedicalStaffFormValues,
  SimpleOption,
} from "../form-modal/MedicalStaffFormModal";
import MedicalStaffDetailModal, {
  MedicalStaffDetail,
} from "../detail-modal/MedicalStaffDetailModal";
export type MedicalStaffItem = MedicalStaffDetail & MedicalStaffFormValues;
type MedicalStaffListProps = {
  items: MedicalStaffItem[];
  departments: SimpleOption[];
  positions: SimpleOption[];
  onSearch: (condition: string, value: string) => void;
  onCreate: (values: MedicalStaffFormValues) => void;
  onUpdate: (id: number, values: MedicalStaffFormValues) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
};
const MedicalStaffList: React.FC<MedicalStaffListProps> = ({
  items,
  departments,
  positions,
  onSearch,
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [editing, setEditing] = useState<MedicalStaffItem | null>(null);
  const [detail, setDetail] = useState<MedicalStaffItem | null>(null);
  const [condition, setCondition] = useState("name");
  const [value, setValue] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null); // 추가: 선택된 row
  const handleOpenCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };
  const handleOpenEdit = (item: MedicalStaffItem) => {
    setEditing(item);
    setOpenForm(true);
  };
  const handleOpenDetail = (item: MedicalStaffItem) => {
    setDetail(item);
    setSelectedId(item.id ?? null); // 추가: 선택 표시
    setOpenDetail(true);
  };
  const handleSubmit = (values: MedicalStaffFormValues) => {
    if (editing?.id) {
      onUpdate(editing.id, values);
    } else {
      onCreate(values);
    }
    setOpenForm(false);
  };
  const handleSearch = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    onSearch(condition, value);
  };
  const handleDelete = (id: number) => {
    const ok = window.confirm("진짜 삭제하시겠습니까?");
    if (ok) onDelete(id);
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">의료진 목록</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          의료진 등록
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <TextField
          select
          label="조건"
          size="small"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <MenuItem value="name">이름</MenuItem>
          <MenuItem value="department">부서</MenuItem>
          <MenuItem value="position">직책</MenuItem>
          <MenuItem value="staff_type">직군</MenuItem>
          <MenuItem value="staff_id">직원 ID</MenuItem>
        </TextField>
        <TextField
          label="검색어"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="button" variant="outlined" onClick={handleSearch}>
          검색
        </Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">직원ID</TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">부서</TableCell>
            <TableCell align="center">직책</TableCell>
            <TableCell align="center">상태</TableCell>
            <TableCell align="center">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              hover
              selected={selectedId === item.id} // 추가: 선택 강조
              sx={{
                cursor: "pointer",
                "&.Mui-selected": { bgcolor: "rgba(25,118,210,0.08)" }, // 추가: 선택 색상
                "&.Mui-selected:hover": { bgcolor: "rgba(25,118,210,0.12)" }, // 추가
              }}
              onClick={() => handleOpenDetail(item)}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.bio}</TableCell>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.domainRole}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(item);
                  }}
                >
                  수정
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.id) handleDelete(item.id);
                  }}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!items.length && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                {loading ? "로딩 중..." : "데이터 없음"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <MedicalStaffFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
        departments={departments}
        positions={positions}
        title={editing ? "의료진 수정" : "의료진 등록"}
      />
      <MedicalStaffDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={detail}
      />
    </Box>
  );
};
export default MedicalStaffList;