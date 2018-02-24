package app.repository;

import app.entity.Point;
import app.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PointRepository extends CrudRepository<Point, Long> {
    List<Point> findPointsByUser(User user);
    @Transactional
    void deleteAllByUser(User user);
}