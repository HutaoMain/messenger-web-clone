package com.clone.messenger.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clone.messenger.dto.ConversationResponse;
import com.clone.messenger.entities.Conversation;
import com.clone.messenger.service.ConversationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/conversation")
public class ConversationController {

    @Autowired
    ConversationService conversationService;

    @PostMapping("/createConversation")
    public Conversation createConversation(@RequestBody Conversation conversation) {
        return conversationService.createConversation(conversation);
    }

    @GetMapping("/list")
    public List<ConversationResponse> getConversations() {
        return conversationService.getAllConversationResponse();
    }

}
