package app.controller;

import app.entity.*;
import app.repository.PointRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PointRepository pointRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/{login}/getTable")
    public List<Point> getTable(@PathVariable String login){
        System.out.println("\n\ngetTable for " + login + "\n");
        return pointRepository.findPointsByUser(userRepository.findByLogin(login));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{login}/deletePoints")
    public void delete(@PathVariable String login){
        System.out.println("\n\ndelete for " + login + "\n");
        pointRepository.deleteAllByUser(userRepository.findByLogin(login));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{login}/addPoint")
    public void addPoint(@PathVariable String login, @RequestBody Point point){
        System.out.println("\n\nadd point " + login);
        System.out.println(point.getX() + " | " + point.getY() + " | " + point.getR()  + " | " + point.isResult() + "\n\n");

        point.setUsers(userRepository.findByLogin(login));
        pointRepository.save(point);
    }

    @GetMapping(value = "/{login}/delete")


    @RequestMapping(method = RequestMethod.POST, value = "/validate")
    public ResponseEntity validate(@RequestBody User user){
        System.out.println("\n\nvalidate for " + user.getLogin() + " | " + user.getPassword() + "\n\n");
        if(user.getPassword().equals(userRepository.findByLogin(user.getLogin()).getPassword())) {
            System.out.println("\n\nyep\n\n");
            return new ResponseEntity(HttpStatus.OK);
        }
        else{
            System.out.println("\n\nnope\n\n");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/registration")
    public ResponseEntity register(@RequestBody User user){
        user.setPoints(null);
        if(userRepository.findByLogin(user.getLogin())!=null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/getList")
    public ArrayList<Point> getList(){
        return new ArrayList<Point>(Arrays.asList(new Point(1,2,3,true), new Point(3,2,1,false)));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getHat")
    public String hat(){
        return "Как раз!!!";
    }
}