/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.repositories;

import com.sergioarboleda.divinacomediamongodb.app.model.Order;
import com.sergioarboleda.divinacomediamongodb.app.repositories.crud.OrderCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Daniel
 */
@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository repository;
    
    public List<Order> getAll(){
        return (List<Order>)repository.findAll();
    }
    
    public Optional<Order> getById(Integer id){
        return repository.findById(id);
    }
    
    public  Order save(Order order){
        return repository.save(order);
    }
    
    public void delete(Integer id){
        repository.deleteById(id);
    }
    
    public void update(Order order){
        repository.save(order);
    }
    
    public Optional<Order> getOrderById(Integer id){
        return repository.findById(id);
    }
    
    public Optional<Order> lastUserId(){
        return repository.findTopByOrderByIdDesc();
    }
    
    public List<Order> getOrderByZone(String zone){
        return repository.findByZone(zone);
    }
}
