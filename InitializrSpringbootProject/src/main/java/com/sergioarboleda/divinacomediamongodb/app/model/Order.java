/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.model;

import java.util.Date;
import java.util.Map;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Daniel
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="orders")
public class Order {
    public static String PENDING = "Pendiente";

    public static String APROVED = "Aprobada";

    public static String REJECTED = "Rechazada";

    @Id
    private Integer id;

    private Date registerDay;

    private String status;

    private User salesMan;

    private Map<String, HairProduct> products;

    private Map<String, Integer> quantities;
}
