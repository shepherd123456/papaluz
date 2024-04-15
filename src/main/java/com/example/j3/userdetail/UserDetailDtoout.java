package com.example.j3.userdetail;

import com.example.j3.address.AddressDtoout;
import com.example.j3.userdetail.birth.BirthDtoout;
import com.example.j3.userdetail.fullname.FullNameDtoout;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDetailDtoout {
    public FullNameDtoout fullName;
    public BirthDtoout birth;
    public AddressDtoout address;
    public String phone;
    public String citizenship;

    public UserDetailDtoout(UserDetail userDetail) {
        fullName = new FullNameDtoout(
                userDetail.getFirstName(),
                userDetail.getMiddleName(),
                userDetail.getLastName()
        );
        if(userDetail.getBirth() != null){
            birth = new BirthDtoout(userDetail.getBirth());
        }
        if(userDetail.getAddresses().get(0) != null){
            address = new AddressDtoout(userDetail.getAddresses().get(0));
        }
        phone = userDetail.getPhone();
        citizenship = userDetail.getCitizenship();
    }
}
