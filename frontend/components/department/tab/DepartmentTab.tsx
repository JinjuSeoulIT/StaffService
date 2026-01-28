"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import DepartmentFormModal, {
  DepartmentFormValues,
} from "../form-modal/DepartmentFormModal";
export type DepartmentItem = DepartmentFormValues;
type DepartmentTabProps = {
  departments: DepartmentItem[];
  onCreate: (values: DepartmentFormValues) => void;
  onUpdate: (id: number, values: DepartmentFormValues) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
};
const DepartmentTab: React.FC<DepartmentTabProps> = ({
  departments,
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DepartmentItem | null>(null);
  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const handleOpenEdit = (item: DepartmentItem) => {
    setEditing(item);
    setOpen(true);
  };
  const handleSubmit = (values: DepartmentFormValues) => {
    if (editing?.id) {
      onUpdate(editing.id, values);
    } else {
      onCreate(values);
    }
    setOpen(false);
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">부서 관리</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          부서 등록
        </Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>부서명</TableCell>
            <TableCell>건물</TableCell>
            <TableCell>층</TableCell>
            <TableCell>호실</TableCell>
            <TableCell>내선</TableCell>
            <TableCell>상태</TableCell>
            <TableCell align="right">액션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.id}</TableCell>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.buildingNo}</TableCell>
              <TableCell>{dept.floorNo}</TableCell>
              <TableCell>{dept.roomNo}</TableCell>
              <TableCell>{dept.extension}</TableCell>
              <TableCell>{dept.status}</TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => handleOpenEdit(dept)}>
                  수정
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => dept.id && onDelete(dept.id)}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!departments.length && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                {loading ? "로딩 중..." : "데이터 없음"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DepartmentFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
        title={editing ? "부서 수정" : "부서 등록"}
      />
    </Box>
  );
};
export default DepartmentTab;