/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.repositories;

import com.sergioarboleda.divinacomediamongodb.app.model.HairProduct;
import com.sergioarboleda.divinacomediamongodb.app.repositories.crud.HairProductCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Daniel
 */
@Repository
public class HairProductRepository {
    @Autowired
    private HairProductCrudRepository repository;

    public List<HairProduct> getAll(){
        return (List<HairProduct>)repository.findAll();
    }
    
    public Optional<HairProduct> getById(String reference){
        return repository.findById(reference);
    }
    
    public  HairProduct save(HairProduct prod){
        return repository.save(prod);
    }
    
    public void delete(String reference){
        repository.deleteById(reference);
    }
}
