package com.clone.messenger.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponseDto {
    private Long id;
    private String content;
    private String senderName;
    private Date createAt;

    public MessageResponseDto(Long id, String content, String senderName, Date createdAt) {
        this.id = id;
        this.content = content;
        this.senderName = senderName;
        this.createAt = createdAt;
    }
}
