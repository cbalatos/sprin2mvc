


	
//Declare a segment of tests
module( "Contact Backbone Model Tests" );


test("Can be instantiated with correct default values", function() {
    // Number of Assertions we Expect
    expect( 3 );

    // Instantiate Local Contact Backbone Model Object
    var todo = new app.Todo();

    // Default Attribute Value Assertions
    equal( todo.get("title"), "", "Correct Default Title" );
    equal( todo.get("comment"), "no comment", "Correct Deafult Comment" );
    equal( todo.get("completed"), true, "Correct Completed Status" ); //Should fail
});

test("Can be instantiated and attribute values changed", function() {
    // Number of Assertions expected
    expect( 3 );

    // Instantiate Local Contact Backbone Model Object with Attr. Values
    var todo = new app.Todo({
    	title        : "Run Away",
        comment       : "of crucial importance",
        completed   : true
    });

    // Changed Attribute Value Assertions
    equal( todo.get("title"), "Run Away", "Title Correct!" );
    equal( todo.get("comment"), "of crucial importance", "Comment Correct!" );
    equal( todo.get("completed"), true, "Completed State Correct!" );
});


