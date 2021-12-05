/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Daniel
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hairproducts")
public class HairProduct {
    @Id
    private String reference;

    private String brand;

    private String category;

    private String name;

    private String description;

    private boolean availability = true;

    private Double price;

    private Integer quantity;

    private String photography;
}
