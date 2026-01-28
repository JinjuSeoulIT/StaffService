package app.staff.repository;

import app.staff.entity.PositionsEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PositionRepository extends JpaRepository<PositionsEntity, Integer> {
    List<PositionsEntity> findByDomain(String domain);

    Optional<PositionsEntity> findByDomainAndTitle(String domain, String title);

    boolean existsByDomainAndTitle(String domain, String title);
}

