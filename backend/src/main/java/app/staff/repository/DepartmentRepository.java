package app.staff.repository;

import app.staff.entity.DepartmentsEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface DepartmentRepository extends JpaRepository<DepartmentsEntity, Integer> {
    Optional<DepartmentsEntity> findByName(String name);

    boolean existsByName(String name);

    List<DepartmentsEntity> findByLocation(String location);
}

