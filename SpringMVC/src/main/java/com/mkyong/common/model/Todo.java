package com.mkyong.common.model;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

public class Todo {

    @NotEmpty //Hibernate Validation Constains
    @Length(max = 50)
	String title;
	boolean isCompleted;
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public boolean isCompleted() {
		return isCompleted;
	}
	
	public void setCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
	
	
}
