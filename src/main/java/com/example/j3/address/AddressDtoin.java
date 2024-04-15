package com.example.j3.address;

import lombok.AllArgsConstructor;

public class AddressDtoin {
    public String zip;
    public String addressLine1;
    public String addressLine2;
    public String city;
    public String state;
    public String country;

    public AddressDtoin(String zip, String addressLine1, String addressLine2, String city, String state, String country) {
        this.zip = zip;
        this.addressLine1 = addressLine1;
        this.city = city;
        this.state = state;
        this.country = country;
        this.addressLine2 = addressLine2;
    }

    public void update(Address a){
        a.setZip(zip);
        a.setAddressLine1(addressLine1);
        a.setAddressLine2(addressLine2);
        a.setCity(city);
        a.setState(state);
        a.setCountry(country);
    }
}
