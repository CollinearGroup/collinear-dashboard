package com.collineargroup.kudosapi;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final String secret;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);

        Map<String, String> env = System.getenv();
        this.secret = env.get("AUTH_SECRET");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        String token = req.getHeader("Authorization");

        if (token == null) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null) {
            DecodedJWT jwt = JWT.require(Algorithm.HMAC256(secret.getBytes())).build().verify(token);

            return new UsernamePasswordAuthenticationToken("dashboard", null, new ArrayList<>());
        }
        return null;
    }
}
