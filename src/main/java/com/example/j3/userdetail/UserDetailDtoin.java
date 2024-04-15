package com.example.j3.userdetail;

import com.example.j3.address.Address;
import com.example.j3.address.AddressDtoin;
import com.example.j3.userdetail.birth.BirthDtoin;
import com.example.j3.userdetail.fullname.FullNameDtoin;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class UserDetailDtoin {
    public FullNameDtoin fullName;
    public BirthDtoin birth;
    public AddressDtoin address;
    public String phone;
    public String citizenship;

    public void update(UserDetail ud) {
        ud.setFirstName(fullName.firstName);
        ud.setMiddleName(fullName.middleName);
        ud.setLastName(fullName.lastName);
        if (birth != null && !birth.month.isEmpty()) {
            ud.setBirth(birth.date());
        }
        List<Address> as = ud.getAddresses();
        if(!as.isEmpty()) {
            address.update(as.get(0));
        } else {
            as.add(new Address(address));
        }
        ud.setPhone(phone);
        ud.setCitizenship(citizenship);
    }
}
