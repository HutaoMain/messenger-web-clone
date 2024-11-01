package com.clone.messenger.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clone.messenger.entities.Conversation;
import java.util.*;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("SELECT c FROM Conversation c JOIN c.participants p1 JOIN c.participants p2 WHERE p1.id = :userId1 AND p2.id = :userId2")
    Optional<Conversation> findByParticipants(Long userId1, Long userId2);
}
