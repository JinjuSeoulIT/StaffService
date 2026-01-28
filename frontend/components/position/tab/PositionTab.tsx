"use client";
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
import dynamic from "next/dynamic";
import { PositionFormValues } from "@/components/position/form-modal/PositionFormModal";

const PositionFormModal = dynamic(() => import("@/components/position/form-modal/PositionFormModal"), { ssr: false });
export type PositionItem = PositionFormValues;
type PositionTabProps = {
  positions: PositionItem[];
  onCreate: (values: PositionFormValues) => void;
  onUpdate: (id: number, values: PositionFormValues) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
};
const PositionTab: React.FC<PositionTabProps> = ({
  positions,
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PositionItem | null>(null);
  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const handleOpenEdit = (item: PositionItem) => {
    setEditing(item);
    setOpen(true);
  };
  const handleSubmit = (values: PositionFormValues) => {
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
        <Typography variant="h6">직책/직위 관리</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          직책 등록
        </Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>직책명</TableCell>
            <TableCell>코드</TableCell>
            <TableCell>레벨</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>상태</TableCell>
            <TableCell align="right">액션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((pos) => (
            <TableRow key={pos.id}>
              <TableCell>{pos.id}</TableCell>
              <TableCell>{pos.name}</TableCell>
              <TableCell>{pos.code}</TableCell>
              <TableCell>{pos.rankLevel}</TableCell>
              <TableCell>{pos.description}</TableCell>
              <TableCell>{pos.status}</TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => handleOpenEdit(pos)}>
                  수정
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => pos.id && onDelete(pos.id)}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!positions.length && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                {loading ? "로딩 중..." : "데이터 없음"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PositionFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
        title={editing ? "직책 수정" : "직책 등록"}
      />
    </Box>
  );
};
export default PositionTab;