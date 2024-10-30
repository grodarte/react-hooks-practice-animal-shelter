import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

const API = `http://localhost:3001/pets`

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(e){
    setFilters({
      type: e.target.value
    })
    // change filters type state
  }

  function handleFindPetsClick(){
    // fetches a list of pets using fetch based on filters state
    // optional query parameter: i.e. /pets?type=cat
    //set pet state here
    const fetchUrl = filters["type"] === "all" ? API : `http://localhost:3001/pets?type=${filters.type}`

    fetch(fetchUrl)
    .then(r=>r.json())
    .then(petData=>setPets(petData))
  }

  function handleAdoptPet(id){
    // find matching id in pet array and set isAdopted to True
    const updatedPets = pets.map(pet=>{
      if(pet.id === id){
        return {
          ...pet,
          isAdopted: true
        }
      } return pet
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