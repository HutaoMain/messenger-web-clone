package com.clone.messenger.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    private String content;
    private Date createdAt;
}
