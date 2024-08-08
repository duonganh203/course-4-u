package com.mgmtp.cfu.service.impl;

import com.mgmtp.cfu.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class WikiServiceImpl implements WikiService {
    @Autowired
    private RestTemplate restTemplate;
    private static final String API_URL = "https://wiki.mgm-tp.com/confluence/rest/api/content";
    private static final String BEARER_TOKEN = "MjU5MjQ1MTA4MzQ1Op7c48BMCIzgPMoP0XX3Fh4EGML0";
    @Override
    @Scheduled(fixedRate = 7200000)
    public void callWikiApi() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
        String formattedDate = now.format(formatter);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + BEARER_TOKEN);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("title", formattedDate);
        requestBody.put("type", "page");

        Map<String, Object> space = new HashMap<>();
        space.put("id", 106496008);
        space.put("key", "MGMSDN");
        space.put("name", "mgm Internship Đà Nẵng");
        space.put("type", "global");
        requestBody.put("space", space);

        Map<String, Object> ancestors = new HashMap<>();
        ancestors.put("id", "376886648");
        requestBody.put("ancestors", new Map[] { ancestors });

        Map<String, Object> wikiBody = new HashMap<>();
        wikiBody.put("value", "Hello World!");
        wikiBody.put("representation", "wiki");

        Map<String, Object> body = new HashMap<>();
        body.put("wiki", wikiBody);
        requestBody.put("body", body);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);
    }
}
