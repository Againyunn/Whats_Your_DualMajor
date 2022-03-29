package com.comprehensivedesign.dualmajor.config.handler;

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class LogoutSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    public LogoutSuccessHandler(String defaultUrl) {
        setDefaultTargetUrl("/");
    }
}
