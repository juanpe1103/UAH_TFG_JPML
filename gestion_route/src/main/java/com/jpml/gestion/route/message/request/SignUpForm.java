package com.jpml.gestion.route.message.request;
import lombok.Getter;
import lombok.Setter;


import java.util.Set;

import javax.validation.constraints.*;

public class SignUpForm {
    @Setter
    @Getter
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @Setter
    @Getter
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

/*    @Setter
    @Getter
    @NotBlank
    @Size(max = 60)
    //@Email
    private String email;*/

    private Set<String> role;

    @Setter
    @Getter
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}
