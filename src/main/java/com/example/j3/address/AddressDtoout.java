package com.example.j3.address;

public class AddressDtoout {
    public String zip;
    public String addressLine1;
    public String addressLine2;
    public String city;
    public String state;
    public String country;

    public AddressDtoout(Address address){
        zip = address.getZip();
        addressLine1 = address.getAddressLine1();
        addressLine2 = address.getAddressLine2();
        city = address.getCity();
        state = address.getState();
        country = address.getCountry();
    }
}
