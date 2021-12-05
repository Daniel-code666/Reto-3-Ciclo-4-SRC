package com.sergioarboleda.divinacomediamongodb;

import com.sergioarboleda.divinacomediamongodb.app.repositories.crud.HairProductCrudRepository;
import com.sergioarboleda.divinacomediamongodb.app.repositories.crud.OrderCrudRepository;
import com.sergioarboleda.divinacomediamongodb.app.repositories.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DivinacomediamongodbApplication implements CommandLineRunner{

    @Autowired
    private HairProductCrudRepository prodRepo;
    
    @Autowired
    private UserCrudRepository userRepo;
    
    @Autowired
    private OrderCrudRepository orderRepo;
    
	public static void main(String[] args) {
		SpringApplication.run(DivinacomediamongodbApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        prodRepo.deleteAll();
        userRepo.deleteAll();
        orderRepo.deleteAll();
    }

}
