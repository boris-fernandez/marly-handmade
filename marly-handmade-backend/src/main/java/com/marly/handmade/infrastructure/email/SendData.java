package com.marly.handmade.infrastructure.email;

import com.maileroo.EmailAddress;

public record SendData(
        EmailAddress from,
        EmailAddress to,
        String subject,
        String html,
        String plain

) {
}
