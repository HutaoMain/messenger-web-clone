package com.clone.messenger.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone.messenger.dto.MessageDto;
import com.clone.messenger.entities.Conversation;
import com.clone.messenger.entities.Message;
import com.clone.messenger.entities.User;
import com.clone.messenger.repositories.ConversationRepository;
import com.clone.messenger.repositories.MessageRepository;
import com.clone.messenger.repositories.UserRepository;

@Service
public class MessageService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    MessageRepository messageRepository;

    public List<Conversation> getConversations() {
        return conversationRepository.findAll();
    }

    public List<Message> getMessagesByConversation(Long conversationId) {
        return messageRepository.findAllByConversationId(conversationId);
    }

    public void sendMessage(Long conversationId, MessageDto messageDto) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        User sender = userRepository.findById(messageDto.getSenderId()).orElseThrow();

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(messageDto.getContent());
        message.setCreatedAt(new Date());

        messageRepository.save(message);
    }
}
