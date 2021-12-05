/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.service;

import com.sergioarboleda.divinacomediamongodb.app.model.HairProduct;
import com.sergioarboleda.divinacomediamongodb.app.repositories.HairProductRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel
 */
@Service
public class HairProductService {
    @Autowired
    private HairProductRepository repository;
    
    public List<HairProduct> getAll(){
        return repository.getAll();
    }
    
    public Optional<HairProduct> getByRef(String reference){
        return repository.getById(reference);
    }
    
    public HairProduct save(HairProduct prod){
        return repository.save(prod);
    }
    
    public HairProduct update(HairProduct prod){
        Optional<HairProduct> prodExist = repository.getById(prod.getReference());
        
        if (prodExist.isPresent()){
            return repository.save(prod);
        }else{
            return prod;
        }
        
        
    }
    
    public void delete(String reference){
//        if (repository.getByRef(id).isPresent()){
//            repository.delete(id);
//        }
        repository.delete(reference);
    }
}
