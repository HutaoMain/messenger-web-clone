package com.clone.messenger.service;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone.messenger.dto.ConversationRequestDto;
import com.clone.messenger.dto.ConversationResponseDto;
import com.clone.messenger.entities.Conversation;
import com.clone.messenger.entities.Message;
import com.clone.messenger.entities.User;
import com.clone.messenger.repositories.ConversationRepository;
import com.clone.messenger.repositories.UserRepository;

import java.util.*;

@Service
public class ConversationService {

    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    public ConversationResponseDto createOrFetchConversation(ConversationRequestDto conversationRequestDto) {
        Optional<Conversation> existingConversation = conversationRepository
                .findByParticipants(conversationRequestDto.getUserId1(), conversationRequestDto.getUserId2());

        Conversation conversation;
        if (existingConversation.isPresent()) {
            conversation = existingConversation.get();
        } else {
            User user1 = userRepository.findById(conversationRequestDto.getUserId1()).orElseThrow();
            User user2 = userRepository.findById(conversationRequestDto.getUserId2()).orElseThrow();
            conversation = new Conversation();
            conversation.setParticipants(Arrays.asList(user1, user2));
            conversation = conversationRepository.save(conversation);
        }

        return toConversationResponseDto(conversation);
    }

    public List<ConversationResponseDto> getAllConversationResponse() {
        List<Conversation> conversations = conversationRepository.findAll();
        return conversations.stream()
                .map(this::toConversationResponseDto)
                .collect(Collectors.toList());
    }

    private ConversationResponseDto toConversationResponseDto(Conversation conversation) {
        ConversationResponseDto conversationResponse = new ConversationResponseDto();

        conversationResponse.setConversationId(conversation.getId());

        List<String> participantUsernames = conversation.getParticipants().stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
        conversationResponse.setParticipants(participantUsernames);

        Message lastMessage = conversation.getMessages().stream()
                .max(Comparator.comparing(Message::getCreatedAt))
                .orElse(null);
        if (lastMessage != null) {
            conversationResponse.setLastMessage(lastMessage.getContent());
            conversationResponse.setLastMessageTimestamp(lastMessage.getCreatedAt());
        }

        return conversationResponse;
    }
}
