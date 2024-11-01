package com.clone.messenger.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clone.messenger.dto.ConversationRequestDto;
import com.clone.messenger.dto.ConversationResponseDto;
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
    public ConversationResponseDto createOrFetchConversation(
            @RequestBody ConversationRequestDto conversationRequestDto) {
        ConversationResponseDto conversationResponse = conversationService
                .createOrFetchConversation(conversationRequestDto);
        return conversationResponse;
    }

    @GetMapping("/list")
    public List<ConversationResponseDto> getConversations() {
        return conversationService.getAllConversationResponse();
    }
}
