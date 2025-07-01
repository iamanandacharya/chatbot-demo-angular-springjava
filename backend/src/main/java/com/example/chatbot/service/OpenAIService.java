package com.example.chatbot.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class OpenAIService {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    @Autowired
    public OpenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getChatCompletion(String prompt) {
        // Construct the request body for OpenAI API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", Collections.singletonList(
            Map.of("role", "user", "content", prompt)
        ));
        requestBody.put("max_tokens", 150); // Limit response length
        requestBody.put("temperature", 0.7); // Creativity level

        try {
            // Make the API call to OpenAI
            Map<String, Object> response = restTemplate.postForObject(apiUrl, requestBody, Map.class);

            // Extract the generated text
            if (response != null && response.containsKey("choices")) {
                Object choices = response.get("choices");
                if (choices instanceof java.util.ArrayList) {
                    java.util.ArrayList<?> choiceList = (java.util.ArrayList<?>) choices;
                    if (!choiceList.isEmpty()) {
                        Object firstChoice = choiceList.get(0);
                        if (firstChoice instanceof java.util.Map) {
                            java.util.Map<?, ?> choiceMap = (java.util.Map<?, ?>) firstChoice;
                            if (choiceMap.containsKey("message")) {
                                Object message = choiceMap.get("message");
                                if (message instanceof java.util.Map) {
                                    java.util.Map<?, ?> messageMap = (java.util.Map<?, ?>) message;
                                    if (messageMap.containsKey("content")) {
                                        return (String) messageMap.get("content");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "No response from OpenAI.";
        } catch (Exception e) {
            System.err.println("Error calling OpenAI API: " + e.getMessage());
            return "Error: Could not get a response from the AI.";
        }
    }
}