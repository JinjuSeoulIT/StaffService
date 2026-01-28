package app.staff.service;


import app.staff.dto.StaffDto;
import app.staff.entity.StaffEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StaffService {

    // C
    void createStaff(StaffEntity staff, MultipartFile file);

    // R
    List<StaffEntity> selectStaffList();

    StaffEntity selectStaffDetail(int id);

    // U
    void updateStaff(StaffEntity staff, MultipartFile file);

    // D (soft delete)
    void deleteStaff(int id);
}
