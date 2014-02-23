package com.mkyong.common.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.mkyong.common.model.Shop;

@Controller
@RequestMapping("/kfc/brands")
public class JSONController {
	
	List<Shop> shopList;
	
	public JSONController(){
		
		shopList = new ArrayList<Shop>();
		Shop shop1 = new Shop(1);
		shop1.setName("myFirstShop");
		//shop1.setStaffName(new String[] { "mkyong1", "mkyong2" });

		Shop shop2 = new Shop(2);
		shop2.setName("mySecondShop");
		//shop2.setStaffName(new String[] { "mkyong1", "mkyong2" });
		
		shopList.add(shop1);
		shopList.add(shop2);	
		
		System.out.println("Egit Shops List Update Initialised with 2 shops my friend");
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public @ResponseBody
	Shop getShopInJSON(@PathVariable int id) {
		for(Shop s: shopList){
			if (s.getId() == id) return s;
		}

		return null;

	}
	
	@RequestMapping(value = "{shop}", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Shop insertShopInJSON(@PathVariable Shop shop) {

		System.out.println("I will insert a new shop with name" + shop.getName());
		int maxId = 0;
		for(Shop s: shopList){
			if (s.getId() > maxId) maxId= s.getId();
		}

		shop.setId(maxId);
		shopList.add(shop);
		
		return shop;

	}	
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	List<Shop> getShopListInJSON() {



		return shopList;
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.ACCEPTED)
	public @ResponseBody
	void deleteShopListFromJSON(int id) {

		Iterator<Shop> iter = shopList.iterator();

		while (iter.hasNext()){
			Shop s = iter.next();
			if (s.getId() == id){
				shopList.remove(s);
			}
			
			
		}

	}	

}