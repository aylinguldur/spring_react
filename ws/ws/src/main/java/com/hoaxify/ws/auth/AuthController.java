package com.hoaxify.ws.auth;

import com.hoaxify.ws.User.User;
import com.hoaxify.ws.User.UserRepository;
import com.hoaxify.ws.error.ApiError;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
// User loginde kullanıcıya ait password ve username bilgilerinin kontrolü
    @Autowired
    UserRepository userRepository;

//    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/api/1.0/auth")
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization){
    /*    if(authorization == null){
            ApiError error = new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } */
        String base64encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64encoded));
        String [] parts = decoded.split(":");
        String username = parts[0];
        String password = parts[1];
        User inDB = userRepository.findByUsername(username);
        return ResponseEntity.ok(inDB);
        /*if (inDB == null){
            ApiError error = new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        String hashedPass = inDB.getPassword();
        if(!passwordEncoder.matches(password,hashedPass)){
            ApiError error = new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }*/

        //username, displayname, image
        /*Map<String,String> responseBody = new HashMap<>();
        responseBody.put("username",inDB.getUsername());
        responseBody.put("displayName",inDB.getDisplayName());
        responseBody.put("image",inDB.getImage());*/


    }

}
