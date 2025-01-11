import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  
  function handleFindPetsClick(){
    const fetchUrl = filters.type === "all" ? "http://localhost:3001/pets" : `http://localhost:3001/pets?type=${filters.type}`

    fetch(fetchUrl)
    .then(r=>r.json())
    .then(petData=>{
      setPets(petData)
    })

  }

  function handleChangeType(newType){
    setFilters({ type: newType})
  }

  function handleAdoptPet(adoptedPetId){
    const newPetArr = pets.map(pet=>{
      if(pet.id === adoptedPetId){
        return {
          ...pet,
          isAdopted: true
        }
      } else {
        return pet
      }
    })
    setPets(newPetArr)
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