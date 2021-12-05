/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.repositories.crud;

import com.sergioarboleda.divinacomediamongodb.app.model.HairProduct;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author Daniel
 */
public interface HairProductCrudRepository extends MongoRepository<HairProduct, String>{
//    @Query("{reference:?0}")
//    public Optional<HairProduct> findProductById(String reference);
}
