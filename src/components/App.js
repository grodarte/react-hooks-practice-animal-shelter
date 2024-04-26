import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(filterSelection){
    setFilters({
      ...filters,
      type: filterSelection
    })
  }

  function handleFindPetsClick(){
    const filterBy = filters.type === "all" ? "" : `/?type=${filters.type}`
    fetch(`http://localhost:3001/pets${filterBy}`)
    .then(r=>r.json())
    .then(animalData=>setPets(animalData))
  }

  function handleAdoptPet(petID){
    const updatedPets = pets.map(pet=>{
      if(pet.id === petID){
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;