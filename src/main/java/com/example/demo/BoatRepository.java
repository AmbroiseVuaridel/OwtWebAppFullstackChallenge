package com.example.demo;

import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called boatRepository
// CRUD refers Create, Read, Update, Delete

public interface BoatRepository extends CrudRepository<Boat, Integer> {

}
