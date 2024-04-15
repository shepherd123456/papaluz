package com.example.j3.buyer;

import com.example.j3.address.AddressDtoin;
import com.example.j3.userdetail.fullname.FullNameDtoin;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class BuyerDtoin {
    public FullNameDtoin fullName;
    public AddressDtoin address;
    public String citizenship;
    public String phone;
    public String email;
}
