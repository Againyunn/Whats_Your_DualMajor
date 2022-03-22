package com.comprehensivedesign.dualmajor.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration // 해당 클래스를 Spring container에서 관리할 수 있는 구성 요소(component)로 등록함.
@EnableWebSecurity //Spring web security를 활성화 시키기
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /*요청 URL에 따른 접근 권한, 로그인 요청 등에 대한 기본 설정*/
    /*해당 설정에서 각 URL 요청에 따른 접근 권한(일반 사용자, admin 등)을 설정할 수 있고,
    * 로그인이 필요한 페이지들에 자동으로 로그인 요청을 하는 등의 설정 가능!
    * 그런데 경고 문구 없이 바로 로그인 페이지로 넘어가기 때문에, 로그인 페이지로 넘어가기 전에 일련의 경고 문구 설정하는 방법이 필요할 것 같음
    * + logout 기능도 자동으로 제공해주지만, 이 또한 일련의 경고 문구를 추가하면 어떨까 싶음*/
    @Override
    protected void configure(HttpSecurity http) throws Exception { //HttpSecurity 객체를 통해 Http요청에 대한 보안을 설정할 수 있다.
        http.csrf().disable();
        http.authorizeRequests()///authorizeRequests() : HttpServletRequest 요청 URL에 따라 접근 권한을 설정한다.
                // antMatchers() : 요청 URL 경로 패턴을 지정. 지정된 URL 이하 경로 요청에 대하여 보안을 설정하겠다는 의미.
                .antMatchers("/member/**").authenticated() // /member 이하 경로에 있는 요청은 인증이 필요.
                .anyRequest().permitAll() // 위의 인증이 필요한 URL 경로 이외의 요청들은 모든 사용자의 접근 허용
                .and()
                .formLogin() // 로그인 폼 관련 설정
                .loginPage("/login") //로그인 페이지를 "/login" 이라는 경로로 지정
                .loginProcessingUrl("/loginProc") //로그인 요청 URL을 낚아 채어 로그인 인증 진행
                .defaultSuccessUrl("/"); //인증 성공 시 자동으로 redirect할 주소. 만약 특정 페이지에서 로그인 요청을 하고 성공하면 다시 그 페이지로 넘어감.




    }
}