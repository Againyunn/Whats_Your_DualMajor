package com.comprehensivedesign.dualmajor.controller;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.stereotype.Controller
public class Controller {

    /*=========Mapping for Test Spring Security==============*/
    @GetMapping({"","/"})
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/member")
    @ResponseBody
    public String member() {
        return "member page";
    }
    /*============================*/

}
