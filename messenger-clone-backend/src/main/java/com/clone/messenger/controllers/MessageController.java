package com.clone.messenger.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clone.messenger.dto.MessageDto;
import com.clone.messenger.dto.MessageResponseDto;
import com.clone.messenger.service.MessageService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageService messengerService;

    @GetMapping("")
    public List<MessageResponseDto> getMessages(@RequestParam(required = false) Long conversationId) {
        return messengerService.getMessagesByConversationId(conversationId);
    }

    @PostMapping("/addMessage/{conversationId}")
    public void sendMessage(@PathVariable Long conversationId,
            @RequestBody MessageDto messageDto) {
        messengerService.sendMessage(conversationId, messageDto);
    }
}
