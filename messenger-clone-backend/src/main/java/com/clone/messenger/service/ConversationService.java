package com.clone.messenger.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone.messenger.dto.ConversationResponseDto;
import com.clone.messenger.entities.Conversation;
import com.clone.messenger.entities.Message;
import com.clone.messenger.entities.User;
import com.clone.messenger.repositories.ConversationRepository;

@Service
public class ConversationService {

    @Autowired
    ConversationRepository conversationRepository;

    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public List<ConversationResponseDto> getAllConversationResponse() {
        List<Conversation> conversations = conversationRepository.findAll();

        return conversations.stream()
                .map(conversation -> {
                    ConversationResponseDto conversationResponse = new ConversationResponseDto();

                    // Populate conversation participants
                    List<String> participantUsernames = conversation.getParticipants().stream()
                            .map(User::getUsername)
                            .collect(Collectors.toList());

                    conversationResponse.setConversationId(conversation.getId());
                    conversationResponse.setParticipants(participantUsernames);

                    // Get the last message in the conversation (if exists)
                    Message lastMessage = conversation.getMessages().stream()
                            .max(Comparator.comparing(Message::getCreatedAt))
                            .orElse(null);

                    if (lastMessage != null) {
                        conversationResponse.setLastMessage(lastMessage.getContent());
                        conversationResponse.setLastMessageTimestamp(lastMessage.getCreatedAt());
                    }

                    return conversationResponse;
                })
                .collect(Collectors.toList());
    }
}
