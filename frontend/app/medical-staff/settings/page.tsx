"use client";
import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DepartmentTab from "@/components/department/tab/DepartmentTab";
import PositionTab from "@/components/position/tab/PositionTab";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  fetchDepartmentsRequest,
  createDepartmentRequest,
  updateDepartmentRequest,
  deleteDepartmentRequest,
} from "@/entities/department/model/departmentSlice";
import {
  fetchPositionsRequest,
  createPositionRequest,
  updatePositionRequest,
  deletePositionRequest,
} from "@/entities/position/model/positionSlice";
const MedicalStaffSettingsPage = () => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(0);
  const departments = useAppSelector((state) => state.department.items);
  const positions = useAppSelector((state) => state.position.items);
  useEffect(() => {
    dispatch(fetchDepartmentsRequest());
    dispatch(fetchPositionsRequest());
  }, [dispatch]);
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="부서 관리" />
        <Tab label="직책 관리" />
      </Tabs>
      {tab === 0 && (
        <DepartmentTab
          departments={departments}
          onCreate={(values) => dispatch(createDepartmentRequest(values))}
          onUpdate={(id, values) =>
            dispatch(updateDepartmentRequest({ id, data: values }))
          }
          onDelete={(id) => dispatch(deleteDepartmentRequest(id))}
        />
      )}
      {tab === 1 && (
        <PositionTab
          positions={positions}
          onCreate={(values) => dispatch(createPositionRequest(values))}
          onUpdate={(id, values) =>
            dispatch(updatePositionRequest({ id, data: values }))
          }
          onDelete={(id) => dispatch(deletePositionRequest(id))}
        />
      )}
    </Box>
  );
};
export default MedicalStaffSettingsPage;