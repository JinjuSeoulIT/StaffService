package app.staff.service;

import app.staff.entity.StaffEntity;
import app.staff.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;



@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    StaffRepository staffRepository;

    public void createStaff(StaffEntity staffentity, MultipartFile files)
    {
        staffRepository.save(staffentity);
    }

    public List<StaffEntity> selectStaffList()
    {
        return staffRepository.findAll();
    }

    public StaffEntity selectStaffDetail(int id) throws Exception
    {
        Optional<StaffEntity> staffEntity = staffRepository.findById(id);

        if(staffEntity.isPresent())
            return staffEntity.get();

        else
            throw new Exception("Staff id not found");
    }

    public void updateStaff(int id, StaffEntity staffentity, MultipartFile files)
    {
        staffRepository.save(staffEntity);
    }

    public void deleteStaff(int id)
    {
        staffRepository.deleteById(id);
    }

}