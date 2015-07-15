package com.mkyong.common.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@XmlRootElement(name="todo") // compatible with ember
public class Todo {

	@NotEmpty
	int id;
    @NotEmpty //Hibernate Validation Constains
    @Length(max = 50)
	String title;
	boolean isCompleted;
	
	Date startDate;
	
	Date endDate;
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	
}
