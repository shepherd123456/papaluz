package com.example.j3.user;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDtoin {
   public String email;
   public String password;

   public boolean isBad(){
      return email == null || password == null;
   }
}
