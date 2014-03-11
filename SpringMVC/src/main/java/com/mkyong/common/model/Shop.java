package com.mkyong.common.model;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

public class Shop {

	int id;
	
    @NotEmpty //Hibernate Validation Constains
    @Length(max = 50)
	String name;
	
	String staffName[];

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String[] getStaffName() {
		return staffName;
	}
	public void setStaffName(String[] staffName) {
		this.staffName = staffName;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Shop(int id) {
		this.id = id;
	} 
	public Shop() {

	} 
	
}