package com.comprehensivedesign.dualmajor.config.filter;

import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;

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

    @Override
    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        super.setDetails(request, authRequest);
    }


}
