package app.repository;

import app.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);
    @Transactional
    void deleteByLogin(String login);

}