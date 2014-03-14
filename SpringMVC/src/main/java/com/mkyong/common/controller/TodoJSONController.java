package com.mkyong.common.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.mkyong.common.model.Todo;
import com.mkyong.common.model.Todos;

@Controller
@RequestMapping("/todos")
public class TodoJSONController {
	
	List<Todo> todoList;

	
	public TodoJSONController(){
		
		todoList = new ArrayList<Todo>();
		Todo todo1 = new Todo();
		todo1.setTitle("To do first");
		todo1.setCompleted(false);


		Todo todo2 = new Todo();
		todo2.setTitle("To do second");
		todo2.setCompleted(true);
		//shop2.setStaffName(new String[] { "mkyong1", "mkyong2" });
		
		todoList.add(todo1);
		todoList.add(todo2);	

	}
/*
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public @ResponseBody
	Shop getShopInJSON(@PathVariable int id) throws ShopNotFoundException {
		
		System.out.println("Get shop in json for :"+id);
		
		for(Shop s: shopList){
			if (s.getId() == id) return s;
		}

		throw new ShopNotFoundException();

	}*/
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Todo insertTodoInJSON(@Valid @RequestBody Todo todo) { 
		//The valid annotation ensures that if validation annotations declared in the Shop object fails, 
		//a MethodArgumentNotValidException is thrown and  validation errors are returned to the client as a JSON document.

		System.out.println("I will insert a new todo with name" + todo.getTitle());
		//int maxId = 0;


		
		return todo;

	}	
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	Todos getTodoListInJSON() {

		System.out.println("List size =" + todoList.size());

		Todos todos = new Todos();
		todos.setTodos(todoList);
		
		return todos;
	}
	
	/*
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

	}	*/

}
