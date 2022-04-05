package com.comprehensivedesign.dualmajor.config.filter;

import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.log.LogMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

public class CustomUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    public CustomUsernamePasswordAuthenticationFilter() {
        super();
    }

    public CustomUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token;
        if (request == null) {
            System.out.println("request is null");
        }
        if (request.getContentType().equals(MimeTypeUtils.APPLICATION_JSON_VALUE)) {//json request
            try {
                MemberDto memberDto = objectMapper.readValue(
                        request.getReader().lines().collect(Collectors.joining()), MemberDto.class
                );
                token = new UsernamePasswordAuthenticationToken(memberDto.getEmail(), memberDto.getPassword());
            } catch (IOException e) {
                e.printStackTrace();
                throw new AuthenticationServiceException("Request Content Type(applicaion/json) parsing error");
            }
        }
        else{
            String username = obtainUsername(request);
            String password = obtainPassword(request);
            token = new UsernamePasswordAuthenticationToken(username, password);
        }
        this.setDetails(request, token);

        return this.getAuthenticationManager().authenticate(token);
    }

    /*@Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authResult);
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Custom Set SecurityContextHolder to %s", authResult));
        }
        getRememberMeServices().loginSuccess(request, response, authResult);
        if (this.eventPublisher != null) {
            this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(authResult, this.getClass()));
        }
        chain.doFilter(request, response);
    }
*/
    @Override
    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        super.setDetails(request, authRequest);
    }


}
