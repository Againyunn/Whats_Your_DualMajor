package com.comprehensivedesign.dualmajor.config.handler;

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    public LoginSuccessHandler(String defaultUrl) {
        setDefaultTargetUrl(defaultUrl);

    }
}
