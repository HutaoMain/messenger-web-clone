package com.clone.messenger.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clone.messenger.dto.MessageDto;
import com.clone.messenger.entities.Conversation;
import com.clone.messenger.entities.Message;
import com.clone.messenger.service.MessageService;

@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    MessageService messengerService;

    @GetMapping("/conversations")
    public List<Conversation> getConversations() {
        return messengerService.getConversations();
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public List<Message> getMessages(@PathVariable Long conversationId) {
        return messengerService.getMessagesByConversation(conversationId);
    }

    @PostMapping("/conversations/{conversationId}/messages")
    public void sendMessage(@PathVariable Long conversationId,
            @RequestBody MessageDto messageDto) {
        messengerService.sendMessage(conversationId, messageDto);
    }
}
