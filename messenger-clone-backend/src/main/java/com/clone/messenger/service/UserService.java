package com.clone.messenger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone.messenger.entities.User;
import com.clone.messenger.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
