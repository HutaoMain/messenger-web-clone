package com.clone.messenger.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationResponse {
    private Long conversationId;
    private List<String> participants;
    private String lastMessage;
    private Date lastMessageTimestamp;
}
