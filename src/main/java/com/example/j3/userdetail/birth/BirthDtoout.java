package com.example.j3.userdetail.birth;

import lombok.AllArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
public class BirthDtoout {
    public int day;
    public String month;
    public int year;

    public BirthDtoout(LocalDate date) {

        day = date.getDayOfMonth();
        String m = date.getMonth().name();
        month =  m.charAt(0) + m.substring(1).toLowerCase();
        year = date.getYear();
    }
}
