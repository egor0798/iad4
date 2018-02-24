package app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;


@Entity
@Table(name = "point")
public class Point {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    @Column(name = "x")
    private float x;
    @Column(name = "y")
    private float y;
    @Column(name = "r")
    private float r;
    @Column(name="res")
    private boolean result;

    @NotEmpty
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    protected Point(){};

    public Point(float x, float y, float r, boolean res){
        this.x= x;
        this.y= y;
        this.r= r;
        this.result= res;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public User getUser() {
        return user;
    }

    public void setUsers(User users){
        this.user = users;
    }
}