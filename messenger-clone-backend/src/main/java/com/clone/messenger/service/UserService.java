package com.clone.messenger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.clone.messenger.dto.LoginDto;
import com.clone.messenger.entities.User;
import com.clone.messenger.repositories.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User createUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            log.info("User already existing!");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User is already registered");
        }

        String password = encoder.encode(user.getPassword());

        user.setUsername(user.getUsername());
        user.setPassword(password);

        return userRepository.save(user);
    }

    public User loginUser(LoginDto loginDto) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

        User user = userRepository.findByUsername(loginDto.getUsername());

        if (user == null) {
            throw new Exception("User not found");
        }
        if (!encoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new Exception("Invalid password");
        }

        return user;
    }
}
