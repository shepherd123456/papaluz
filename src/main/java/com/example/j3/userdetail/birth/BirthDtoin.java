package com.example.j3.userdetail.birth;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.Month;

@AllArgsConstructor
public class BirthDtoin {
    public int day;
    public String month;
    public int year;

    public LocalDate date() {
        Month m = Month.valueOf(month.toUpperCase());
        return LocalDate.of(year, m.getValue(), day);
    }
}
