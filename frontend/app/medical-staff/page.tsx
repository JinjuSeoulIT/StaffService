"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  fetchMedicalStaffRequest,
  fetchMedicalStaffByConditionRequest,
  createMedicalStaffRequest,
  updateMedicalStaffRequest,
  deleteMedicalStaffRequest,
  MedicalStaffInput,
} from "@/entities/medical-staff/model/medicalStaffSlice";
import { fetchDepartmentsRequest } from "@/entities/department/model/departmentSlice";
import { fetchPositionsRequest } from "@/entities/position/model/positionSlice";
import { MedicalStaffFormValues } from "@/components/medical-staff/form-modal/MedicalStaffFormModal";

const MedicalStaffList = dynamic(() => import("@/components/medical-staff/list/MedicalStaffList"), { ssr: false });

const toMedicalStaffInput = (v: MedicalStaffFormValues): MedicalStaffInput => ({
  staffId: v.staffId,
  name: v.name,
  gender: v.gender,
  birthDate: v.birthDate,
  phone: v.phone,
  email: v.email,
  hireDate: v.hireDate,
  departmentId: v.departmentId ?? undefined,
  positionId: v.positionId ?? undefined,
  status: v.status,
  profileImageFile: v.profileImageFile ?? null,
});

const MedicalStaffPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.medicalStaff.items);
  const loading = useAppSelector((state) => state.medicalStaff.loading);
  const departments = useAppSelector((state) => state.department.items);
  const positions = useAppSelector((state) => state.position.items);
  useEffect(() => {
    dispatch(fetchMedicalStaffRequest());
    dispatch(fetchDepartmentsRequest());
    dispatch(fetchPositionsRequest());

    
  }, [dispatch]);

  const handleCreate = (values:MedicalStaffFormValues) => {
      const formData = new FormData();
      const { profileImageFile, ...staffPayload } = values;

      formData.append(
                      "staff",
                      new Blob([JSON.stringify(staffPayload)], { type: "application/json" }),
                      // "staff.json"
      );

      if (profileImageFile) 
        formData.append("file", profileImageFile);

      console.log("이곳은 formData" + formData) // 전송을 위한 특수객체라서 바로 못봄

      // for (const x of formData.entries()) {
      // console.log(x);
      // };

      for (const x of formData) {
      console.log(x);
      };

      dispatch(createMedicalStaffRequest(formData));
      }

const handleUpdate = (id: number, values: MedicalStaffFormValues) => {
  dispatch(updateMedicalStaffRequest({ id, data: toMedicalStaffInput(values) }));
};

const handleDelete = (id: number) => {
  dispatch(deleteMedicalStaffRequest(id));
};
  return (
    <MedicalStaffList
      items={items}
      departments={departments.map((d) => ({ id: d.id, name: d.name }))}
      positions={positions.map((p) => ({ id: p.id, name: p.name }))}
      loading={loading}
      onSearch={(condition, value) =>
        dispatch(fetchMedicalStaffByConditionRequest({ condition: condition as any, value }))
      }
      onCreate={handleCreate}

      onUpdate={handleUpdate}

      onDelete={handleDelete}
    />
  );
};
export default MedicalStaffPage;