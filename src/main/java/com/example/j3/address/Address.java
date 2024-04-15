package com.example.j3.address;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String zip;
    @Column(name = "address_line1")
    private String addressLine1;
    @Column(name = "address_line2")
    private String addressLine2;
    private String city;
    private String state;
    private String country;

    public Address(AddressDtoin addressDtoin) {
        zip = addressDtoin.zip;
        addressLine1 = addressDtoin.addressLine1;
        city = addressDtoin.city;
        state = addressDtoin.state;
        country = addressDtoin.country;
        addressLine2 = addressDtoin.addressLine2;
    }
}
