package testUnits;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

import com.mkyong.common.controller.JSONController;
import com.mkyong.common.model.Shop;

public class TestShops {

	@Test
	public void test() {
		//fail("Not yet implemented");
		
		JSONController json = new JSONController();	
		
		assertNotNull("The shops list must not be null ", json.getShopListInJSON());
		assertEquals(" Two shops must exist in the shop list", 2, json.getShopListInJSON().size() );
		
		
	}

	
	@Test
	public void testDeletion() {
		//fail("Not yet implemented");
		
		JSONController json = new JSONController();	
		
		json.deleteShopListFromJSON(1);
		assertEquals(" One shop must exist in the shop list after deletion", 1, json.getShopListInJSON().size() );
		
		
	}
	
	@Test
	public void testCreation() {
		//fail("Not yet implemented");
		
		JSONController json = new JSONController();	
		
		Shop s = new Shop();
		
		s.setName("My newly added shop");
		
		json.insertShopInJSON(s);
		assertEquals(" Three shops must exist in the shop list after addition", 3, json.getShopListInJSON().size() );
		
		
	}

}
