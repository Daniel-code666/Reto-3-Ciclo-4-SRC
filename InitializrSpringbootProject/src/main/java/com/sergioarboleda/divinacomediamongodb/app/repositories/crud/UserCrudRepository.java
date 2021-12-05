/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.repositories.crud;

import com.sergioarboleda.divinacomediamongodb.app.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author Daniel
 */
public interface UserCrudRepository extends MongoRepository<User, Integer>{
    public Optional<User> findByName(String name);

    public Optional<User> findByEmail(String email);
    
    public List<User> findByNameOrEmail(String name, String email);
    
    public Optional<User> findByEmailAndPassword(String email, String password);
    
    @Query("{id:?0}")
    public Optional<User> findUserById(Integer id);
    
    public List<User> findByIdOrEmailOrName(Integer id, String email, String name);
    
    //Para seleccionar el usuario con el id maximo
    Optional<User> findTopByOrderByIdDesc();
    
}
