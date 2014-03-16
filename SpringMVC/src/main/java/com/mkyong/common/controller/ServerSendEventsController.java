package com.mkyong.common.controller;

import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sse/**")
public class ServerSendEventsController {



        @RequestMapping("systemalert")
        public @ResponseBody String sendMessage(HttpServletResponse response) {
                Random r = new Random();
                System.out.println("I got a hit going to sleep");
                response.setContentType("text/event-stream");
                try {
                        Thread.sleep(10000);
                } catch (InterruptedException e) {
                        e.printStackTrace();
                }   
                System.out.println("I will response to sleep");
                return "data:Testing 1,2,3" + r.nextInt() +"\n\n";
        }

}
