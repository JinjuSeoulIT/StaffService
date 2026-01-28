package app.staff.entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "POSITIONS")
@Getter
@Setter
@NoArgsConstructor
public class PositionsEntity {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "DOMAIN", length = 50)
    private String domain;

    @Column(name = "TITLE", length = 100)
    private String title;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;
}
