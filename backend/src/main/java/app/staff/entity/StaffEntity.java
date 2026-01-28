package app.staff.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "STAFF")
@Getter
@Setter
@NoArgsConstructor
public class StaffEntity {

    @Id
    @Column(name = "ID")
    private int id;
    // ⚠ Oracle 11g → @GeneratedValue 사용 ❌ (시퀀스는 DB 트리거)

    @Column(name = "USERNAME", nullable = false, length = 50)
    private String username;

    @Column(name = "PASSWORD_HASH", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "EMAIL", nullable = false, length = 100)
    private String email;

    @Column(name = "STATUS", length = 20)
    private String status;

    @Column(name = "DOMAIN_ROLE", length = 50)
    private String domainRole;

    @Column(name = "FULL_NAME", length = 100)
    private String fullName;

    @Column(name = "OFFICE_LOCATION", length = 255)
    private String officeLocation;

    @Column(name = "PHOTO_KEY", length = 255)
    private String photoKey;

    @Lob
    @Column(name = "BIO")
    private String bio;

    @Column(name = "PHONE", length = 20)
    private String phone;
}
