/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.controller;

import com.sergioarboleda.divinacomediamongodb.app.model.HairProduct;
import com.sergioarboleda.divinacomediamongodb.app.service.HairProductService;
import java.util.List;
import java.util.Optional;
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
@RequestMapping("hairproducts")
@CrossOrigin(origins = "*")
public class HairProductController {
    @Autowired
    private HairProductService service;
    
    @GetMapping("/all")
    public List<HairProduct> getUsers(){
        return service.getAll();
    }
    
//    @GetMapping("/{id}")
//    public Optional<HairProduct> getByRef(@PathVariable("id") String id){
//        return service.getByRef(id);
//    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public HairProduct save(@RequestBody HairProduct prod){
        return service.save(prod);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public HairProduct update(@RequestBody HairProduct prod){
        return service.update(prod);
    }
    
    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("reference") String reference){
        service.delete(reference);
    }
    
    @GetMapping("/{reference}")
    public Optional<HairProduct> getByReference(@PathVariable("reference") String reference){
        return service.getByRef(reference);
    }
}
