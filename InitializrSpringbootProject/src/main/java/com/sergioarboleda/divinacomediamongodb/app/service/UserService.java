/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.service;

import com.sergioarboleda.divinacomediamongodb.app.model.User;
import com.sergioarboleda.divinacomediamongodb.app.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel
 */
@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public List<User> getAll(){
        return repository.getAll();
    }
    
    public Optional<User> getUserById(Integer id){
        return repository.getUserById(id);
    }
    
    public User getUser(Integer id){
        return getUserById(id).orElse(new User());
    }
    
    public User save(User user){
        if(user.getId() == null){
            return user;
        }else{
            if(user.getIdentification() == null || user.getEmail() == null || user.getName() == null || 
               user.getPassword() == null || user.getType() == null){
               return user; 
            }else{
                List<User> userExist = repository.findByIdOrMailOrName(user.getId(), user.getEmail(), user.getName());
                if(userExist.isEmpty()){
                    return repository.save(user);
                }else{
                    return user;
                }
            }
        }
    }
    
    public boolean checkEmailServ(String email){
        return repository.getUserByEmail(email).isPresent();
    }
    
    public User getUserByEmailAndPassword(String email, String password){
        Optional<User> user = repository.getUserByEmailAndPassword(email, password);
        
        if(user.isPresent()){
            return user.get();
        }else{
            return new User();
        }
    }
    
    public User update(User user){
        Optional<User> userExist = repository.getUserById(user.getId());
        
        if(userExist.isPresent()){
            if(user.getIdentification() != null){
                userExist.get().setIdentification(user.getIdentification());
            }
            
            if(user.getName() != null){
                userExist.get().setName(user.getName());
            }
            
            if(user.getBirthtDay()!= null){
                userExist.get().setBirthtDay(user.getBirthtDay());
            }
            
            if(user.getMonthBirthtDay()!= null){
                userExist.get().setMonthBirthtDay(user.getMonthBirthtDay());
            }
            
            if(user.getAddress()!= null){
                userExist.get().setAddress(user.getAddress());
            }
            
            if(user.getCellPhone()!= null){
                userExist.get().setCellPhone(user.getCellPhone());
            }
            
            if(user.getEmail()!= null){
                userExist.get().setEmail(user.getEmail());
            }
            
            if(user.getPassword()!= null){
                userExist.get().setPassword(user.getPassword());
            }
            
            if(user.getZone()!= null){
                userExist.get().setZone(user.getZone());
            }
            
            if(user.getType()!= null){
                userExist.get().setType(user.getType());
            }
            
            return repository.save(user);
        }else{
            return user;
        }
    }
    
    public boolean delete(int id){
//        if (repository.getUserById(id).isPresent()){
//            repository.delete(id);
//        }
        Optional<User> existUser = repository.getUserById(id);

        if(existUser.isPresent()){
            repository.delete(id);
            return true;
        }
        return false;
    }
}
