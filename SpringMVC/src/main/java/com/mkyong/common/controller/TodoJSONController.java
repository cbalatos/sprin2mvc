package com.mkyong.common.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
	

	
	static class todos extends ArrayList<Todo> { }
	
	todos todoList;
	//List<Todo> todoList;
	//Todos todos;

	
	public TodoJSONController(){
		
		todoList = new todos();
		Todo todo1 = new Todo();
		todo1.setId(1);
		todo1.setTitle("To do first");
		todo1.setCompleted(false);


		Todo todo2 = new Todo();
		todo2.setId(2);
		todo2.setTitle("To do second");
		todo2.setCompleted(true);
		//shop2.setStaffName(new String[] { "mkyong1", "mkyong2" });
		
		todoList.add(todo1);
		todoList.add(todo2);	
		

		//todos = new Todos();
		//todos.setTodos(todoList);

	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public @ResponseBody
	Todo getShopInJSON(@PathVariable int id) throws ShopNotFoundException {
		
		System.out.println("Get todo in json for :"+id);
		
		for(Todo s: todoList){
			System.out.println("Is it equal :"+id+ " and " +s.getId());
			if (s.getId() == id) return s;
		}

		throw new ShopNotFoundException();

	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Todo updateTodoInJSON(@PathVariable int id,  @RequestBody Todo todo)  throws ShopNotFoundException{ 
		//The valid annotation ensures that if validation annotations declared in the Shop object fails, 
		//a MethodArgumentNotValidException is thrown and  validation errors are returned to the client as a JSON document.

		System.out.println("I will update  a new todo with id" + id);
		//int maxId = 0;

		Todo tobeUpdated = null;
		if (id == 0)
			throw new ShopNotFoundException();
		for (Todo t: todoList){
			if (t.getId() == id)
				tobeUpdated = t;
		}

		if (tobeUpdated == null) throw new ShopNotFoundException();
		
		System.out.println("I will update todo");
		tobeUpdated.setCompleted(todo.isCompleted());
		tobeUpdated.setTitle(todo.getTitle());
		return tobeUpdated;

	}	
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	Todo insertTodoInJSON(@RequestBody Todo todo) { 
		//The valid annotation ensures that if validation annotations declared in the Shop object fails, 
		//a MethodArgumentNotValidException is thrown and  validation errors are returned to the client as a JSON document.

		System.out.println("I will insert a new todo with name" + todo.getTitle());
		
		todo.setId(maxIdInTodoList()+1);

		todoList.add(todo);

		
		return todo;

	}	
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	todos getTodoListInJSON() {

		System.out.println("List size =" + todoList.size());


		return todoList;
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
	
    @RequestMapping("reloadalert")
    public @ResponseBody String sendMessage(HttpServletResponse response) {
            Random r = new Random();
            System.out.println("I got a hit going to sleep and then I will add one todo"); 
            response.setContentType("text/event-stream");
            try {
                    Thread.sleep(10000);
            } catch (InterruptedException e) {
                    e.printStackTrace();
            }   
            System.out.println("I will response to sleep with new job");
    		Todo todoAdd = new Todo();
    		todoAdd.setId(maxIdInTodoList()+1);
    		todoAdd.setTitle("To do second with random = "+r.nextInt());
    		todoAdd.setCompleted(false);
    		todoList.add(todoAdd);
    		
            return "data:Testing 1,2,3" + r.nextInt() +"\n\n";
    }
    
    private int maxIdInTodoList (){
    	int maxId = 0;
    	for (Todo t:todoList){
    		if (maxId < t.getId())
    			maxId = t.getId();
    	}
    	return maxId;
    }
    

}
