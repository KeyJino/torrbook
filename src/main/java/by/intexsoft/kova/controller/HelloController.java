package by.intexsoft.kova.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/welcome")
public class HelloController {

    /**
     * @return "Hello world!"
     */
    @GetMapping
    public String message() {
        return "hello";
    }
}
