package testUnits;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import gr.cbal.utils.TestUtil;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.mkyong.common.model.Shop;

// Adapted From http://www.brucephillips.name/blog/index.cfm/2012/12/20/Spring-Release-32--Easier-Spring-MVC-Tests
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("mvc-dispatcher-servlet.xml")
public class TestController {
	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}

	@Test
	public void testDefault() throws Exception {
		mockMvc.perform( get("/kfc/brands"))
		.andExpect(status().isOk()) //check status
		.andDo(print()); //print request and response headers
	}


	@Test
	public void testCompare() throws Exception {
		//Regular to fail 
		mockMvc.perform( get("/compare?input1=Bruce&input2=Andrew")).andExpect(status().isOk())
		.andExpect(model().attributeExists("output") ).andExpect(forwardedUrl("WEB-INF/views/compareResult.jsp"));

	}	

	//all rest json testing from http://www.petrikainulainen.net/programming/spring-framework/unit-testing-of-spring-mvc-controllers-rest-api/
	@Test
	public void testGetShopListInJSON() throws Exception {


		mockMvc.perform( get("/kfc/brands"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$", hasSize(2))) //use json-path to analyze the json object
        .andExpect(jsonPath("$[0].id", is(1)))
        .andExpect(jsonPath("$[0].name", is("myFirstShop")))
        .andExpect(jsonPath("$[1].id", is(2)))
        .andExpect(jsonPath("$[1].name", is("mySecondShop")));

	}

	
	@Test
	public void testGetShopInJSON()throws Exception{


        mockMvc.perform(get("/kfc/brands/{id}", 1))
        .andExpect(status().isOk())
        .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8)) 
        .andExpect(jsonPath("$.id", is(1)));

        
        mockMvc.perform(get("/kfc/brands/{id}", 4))
        .andExpect(status().isNotFound());
   
        
	}

	@Test
	public void testInsertShopInJSON() throws Exception {
			
			Shop shop = new Shop();
			shop.setName("1111111111111111111111111111111");
			
	       mockMvc.perform(post("/kfc/brands")
	                .contentType(TestUtil.APPLICATION_JSON_UTF8)
	                .content(TestUtil.convertObjectToJsonBytes(shop)))
	                .andExpect(status().isCreated())
	                .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
	                .andDo(print());
	}

	
	@Test
	public void testInsertFailureShopInJSON() throws Exception {
			
			Shop shop = new Shop();
			shop.setName("222222222222222222222222222222222222222222222222222222222222222222222222222222");
			
	       mockMvc.perform(post("/kfc/brands")
	                .contentType(TestUtil.APPLICATION_JSON_UTF8)
	                .content(TestUtil.convertObjectToJsonBytes(shop)))
	                .andExpect(status().isBadRequest())
	                .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
	                
	                .andExpect(jsonPath("$.fieldErrors", hasSize(1)))
	                /*
	                .andExpect(jsonPath("$.fieldErrors[*].path", containsInAnyOrder("title", "description")))
	                .andExpect(jsonPath("$.fieldErrors[*].message", containsInAnyOrder(
	                        "The maximum length of the description is 500 characters.",
	                        "The maximum length of the title is 100 characters."
	                )))*/
	                .andDo(print());
	}
	
	//Test todo comntroller
	@Test
	public void testGetTodoListInJSON() throws Exception {


		mockMvc.perform( get("/todos"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$.todos", hasSize(2))) //use json-path to analyze the json object
        .andExpect(jsonPath("$.todos[0].title", is("To do first")))
        .andExpect(jsonPath("$.todos[0].completed", is(false)))
        .andExpect(jsonPath("$.todos[1].title", is("To do second")))
		.andExpect(jsonPath("$.todos[1].completed", is(true)));

	}
}

