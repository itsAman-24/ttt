import { useState } from "react";

export default function Player({initialPlayerName, symbol, isActive, onChangeName}) {
    //State for editing and saving the edited player name.
    const [newPlayerName , setNewPlayerName] = useState(initialPlayerName);

    //State for showing input field when click on edit button occurs and save button will be displayed
    const [isEditing , setIsEditing] = useState(false);
    
    function handleChange(event) {
        setNewPlayerName(event.target.value);
        
    }

    function handleEditBtnClick() {
        setIsEditing(isEditing => !isEditing);
        
        if(isEditing) {
            onChangeName(symbol, newPlayerName);
        }
        
        // REACT generally doesn't change the state immediately but it schedules it for the future when it gets time.

        // (isEditing ? false : true) OR (!isEditing) Instead of these codes we should use ((isEditing) => !isEditing) to change the current state based on some previous state value because it will instantly change the current state of isEditing with the help of callback function passed in the setIsEditing().

    }

    let editablePlayerName = <span className="player-name">{newPlayerName}</span>;
    // let buttonCaption = "Edit";

    if(isEditing) {
        editablePlayerName = (
        <input type="text" required value={newPlayerName} onChange={handleChange} />
        );
        // buttonCaption = "Save";
    }

    return (
        <li className={isActive ? "active" : ""}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>

            <button onClick={handleEditBtnClick}>{isEditing ? "Save" : "Edit"}</button>

        </li>
      
    );
}