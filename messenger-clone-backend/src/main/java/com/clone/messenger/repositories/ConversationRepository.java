package com.clone.messenger.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clone.messenger.entities.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

}
