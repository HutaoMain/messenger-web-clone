package com.clone.messenger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {
    private Long senderId;
    private String content;
}
