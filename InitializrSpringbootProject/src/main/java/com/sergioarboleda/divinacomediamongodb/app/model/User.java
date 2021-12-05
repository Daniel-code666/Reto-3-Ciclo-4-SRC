/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.model;

import java.util.Date;
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
@Document(collection = "usuarios")
public class User {
    @Id
    private Integer id;

    private String identification;

    private String name;

    private Date birthtDay;

    private String monthBirthtDay;

    private String address;

    private String cellPhone;

    private String email;

    private String password;

    private String zone;

    private String type;
}
