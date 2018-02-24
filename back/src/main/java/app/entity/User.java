package app.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Transient
    private List<Point> points;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "login")
    private String login;
    @Column(name = "password")
    private String password;

    @OneToMany( mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Point> getPoints() {
        return points;
    }

    protected User(){}

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
