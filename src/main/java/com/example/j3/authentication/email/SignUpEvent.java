package com.example.j3.authentication.email;

import com.example.j3.user.UserDtoin;
import org.springframework.context.ApplicationEvent;

public class SignUpEvent extends ApplicationEvent {
    public SignUpEvent(UserDtoin userDtoin) {
        super(userDtoin);
    }
}
