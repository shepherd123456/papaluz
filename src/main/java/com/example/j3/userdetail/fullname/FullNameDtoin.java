package com.example.j3.userdetail.fullname;

import lombok.AllArgsConstructor;

public class FullNameDtoin {
    public String firstName;
    public String middleName;
    public String lastName;

    public FullNameDtoin(String firstName, String middleName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
    }
}
