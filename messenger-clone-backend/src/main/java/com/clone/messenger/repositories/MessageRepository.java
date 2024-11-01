package com.clone.messenger.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clone.messenger.entities.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllByConversationId(Long conversationId);

    List<Message> findTopByOrderByCreatedAtDesc();
}
