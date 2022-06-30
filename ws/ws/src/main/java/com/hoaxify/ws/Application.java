package com.hoaxify.ws;

import com.hoaxify.ws.User.User;
import com.hoaxify.ws.User.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	//Uygulama ayağa kalktıktan sonra koşulabilen alan. Otomatik olarak user oluşturulur.
	@Bean
	CommandLineRunner createInitialUsers(UserService userService){
		return(args) -> {
					User user = new User();
					user.setUsername("user1");
					user.setDisplayName("display1");
					user.setPassword("Password123");
					userService.userSave(user);
			};
		};
	}
