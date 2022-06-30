package com.hoaxify.ws.User;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    //private static final Logger log  = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.userSave(user);
        return new GenericResponse("user created");
        /*String username= user.getUsername();
        String displayName = user.getDisplayName();
        Map<String,String> validationErrors= new HashMap<>();
        ApiError error = new ApiError(400,"Validation Error","/api/1.0/users");
        if(username==null || username.isEmpty())
        {
            validationErrors.put("username","username can not be null");
        }
        if(displayName==null || displayName.isEmpty())
        {
            validationErrors.put("displayName","displayname can not be null");
        }
        if (validationErrors.size()>0)
        {
            error.setValidationErrors(validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }*/
      //  log.info(user.toString());
    }
    //Valid operasyonunu spring gerçekleştiriyor. Biz sadece gelen hata mesajlarını clienta uygun şekle çeviriyoruz.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exception)
    {
        ApiError error = new ApiError(400,"Validation Error","/api/1.0/users");
        Map<String,String> validationErrors= new HashMap<>();
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        error.setValidationErrors(validationErrors);
        return error;
    }
}
