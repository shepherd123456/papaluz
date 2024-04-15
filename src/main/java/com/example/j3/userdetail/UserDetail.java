package com.example.j3.userdetail;

import com.example.j3.address.Address;
import com.example.j3.user.User;
import com.example.j3.userdetail.fullname.FullNameDtoin;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_detail")
public class UserDetail {
    @Id
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "middle_name")
    private String middleName;
    @Column(name = "last_name")
    private String lastName;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_detail_addresses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id")
    )
    private List<Address> addresses = new ArrayList<>();
    private LocalDate birth;
    private String citizenship;
    private String phone;
    @Column(name = "profile_imgfilename")
    private String profileImgFilename;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    public UserDetail(FullNameDtoin fullNameDtoin, List<Address> addresses, LocalDate birth, String citizenship, String phone, User user) {
        firstName = fullNameDtoin.firstName;
        middleName = fullNameDtoin.middleName;
        lastName = fullNameDtoin.lastName;
        this.addresses = addresses;
        this.birth = birth;
        this.citizenship = citizenship;
        this.phone = phone;
        this.user = user;
    }
}
