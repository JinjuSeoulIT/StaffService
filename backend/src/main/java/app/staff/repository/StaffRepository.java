package app.staff.repository;

import app.staff.entity.StaffEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface StaffRepository extends JpaRepository<StaffEntity, Integer> {
    List<StaffEntity> findByStatus(String status);

    List<StaffEntity> findByDomainRole(String domainRole);

    List<StaffEntity> findByDomainRoleAndStatus(String domainRole, String status);

    List<StaffEntity> findByFullNameContaining(String keyword);
}

