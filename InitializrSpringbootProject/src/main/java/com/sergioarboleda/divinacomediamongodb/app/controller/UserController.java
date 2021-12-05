/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.controller;

import com.sergioarboleda.divinacomediamongodb.app.model.User;
import com.sergioarboleda.divinacomediamongodb.app.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Daniel
 */
@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService service;
    
    @GetMapping("/all")
    public List<User> getUsers(){
        return service.getAll();
    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user){
        return service.save(user);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){
        return service.update(user);
    }
    
    @GetMapping("/emailexist/{email}")
    public boolean checkEmail(@PathVariable String email){
       return service.checkEmailServ(email);
    }
    
    @GetMapping("/{email}/{password}")
    public User validateUser(@PathVariable String email, @PathVariable String password){
        return service.getUserByEmailAndPassword(email, password);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") Integer id){
        return service.delete(id);
    }
    
    @GetMapping("/{id}")
    public User infoUser(@PathVariable("id") Integer id){
        // return service.getUserById(id).orElse(new User());
        return service.getUser(id);
    }
}
