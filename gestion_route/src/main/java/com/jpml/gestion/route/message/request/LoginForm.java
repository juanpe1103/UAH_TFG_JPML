package com.jpml.gestion.route.message.request;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
public class LoginForm {

    @NotBlank
    @Size(min=3, max = 50)
    private String username = "Juan";

    @NotBlank
    @Size(min = 6, max = 40)
    private String password = "password123";

}
