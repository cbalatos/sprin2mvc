package com.mkyong.common.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
		
		System.out.println("Shops List Initialised with 2 shops");
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public @ResponseBody
	Shop getShopInJSON(@PathVariable int id) throws ShopNotFoundException {
		
		System.out.println("Get shop in json for :"+id);
		
		for(Shop s: shopList){
			if (s.getId() == id) return s;
		}

		throw new ShopNotFoundException();

	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Shop insertShopInJSON(@Valid @RequestBody Shop shop) { 
		//The valid annotation ensures that if validation annotations declared in the Shop object fails, 
		//a MethodArgumentNotValidException is thrown and  validation errors are returned to the client as a JSON document.

		System.out.println("I will insert a new shop with name" + shop.getName());
		int maxId = 0;
		for(Shop s: shopList){
			if (s.getId() > maxId) maxId= s.getId();
		}
		maxId ++;


		shop.setId(maxId);
		
		System.out.println("I will insert a new shop with id" + shop.getId());
		shopList.add(shop);
		
		System.out.println("New list size =" + shopList.size());
		
		return shop;

	}	
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	List<Shop> getShopListInJSON() {

		System.out.println("List size =" + shopList.size());

		return shopList;
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.ACCEPTED)
	public @ResponseBody
	void deleteShopListFromJSON(@PathVariable int id)  {

		Iterator<Shop> iter = shopList.iterator();

		while (iter.hasNext()){
			Shop s = iter.next();
			if (s.getId() == id){
				
				iter.remove();
			}
			
			
		}
		System.out.println("After deletion size="+shopList.size());

	}	

}
