package testUnits;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

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


		mockMvc.perform( get("/kfc/brands")).andExpect(status().isOk() );

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
        //.andExpect(content().contentType(TestUtil.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$", hasSize(2)))
        .andExpect(jsonPath("$[0].id", is(1)))
        .andExpect(jsonPath("$[0].name", is("myFirstShop")))
        .andExpect(jsonPath("$[1].id", is(2)))
        .andExpect(jsonPath("$[1].name", is("mySecondShop")));
	}
}

