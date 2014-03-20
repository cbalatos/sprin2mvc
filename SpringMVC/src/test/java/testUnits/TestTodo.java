package testUnits;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.util.ArrayList;

import org.junit.Test;

import com.mkyong.common.controller.JSONController;
import com.mkyong.common.controller.ShopNotFoundException;
import com.mkyong.common.controller.TodoJSONController;
import com.mkyong.common.model.Shop;
import com.mkyong.common.model.Todo;

public class TestTodo {

	@Test
	public void test() {
		//fail("Not yet implemented");
		
		TodoJSONController json = new TodoJSONController();	
		
		assertNotNull("The todos item must not be null ", json.getTodoListInJSON());
		assertNotNull("The todos list must not be null ", ((ArrayList<Todo>) json.getTodoListInJSON()).size());
		
		
	}

	
	@Test
	public void testDeletion() {

		TodoJSONController json = new TodoJSONController();	
		
		json.deleteTodoFromJSON(1);
		assertEquals(" One todo must exist in the shop list after deletion", 1, ((ArrayList<Todo>) json.getTodoListInJSON()).size());
		
	}
	
	@Test
	public void testCreation() {

		TodoJSONController json = new TodoJSONController();	
		
		Todo s = new Todo();
		
		s.setTitle("New One");
		s.setCompleted(true);
		
		json.insertTodoInJSON(s);
		assertEquals(" Three todos must exist in the shop list after addition", 3,((ArrayList<Todo>) json.getTodoListInJSON()).size());
	}
	
	@Test
	public void testUpdate() {

		TodoJSONController json = new TodoJSONController();	
		
		Todo s = new Todo();
		
		s.setId(1);
		s.setTitle("Update First");
		s.setCompleted(true);
		
		try {
			json.updateTodoInJSON(1, s);
			assertEquals(" Two todos must exist in the shop list after update", 2,((ArrayList<Todo>) json.getTodoListInJSON()).size());
			assertEquals(" Assert that the first object has id", 1,((ArrayList<Todo>) json.getTodoListInJSON()).get(0).getId());
		} catch (ShopNotFoundException e) {
			fail("Todo not found");
			// TODO Auto-generated catch block
		}
	}

}
