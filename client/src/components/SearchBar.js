import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom"

function SearchBar({placeholder, sandwiches}) {

    const [filteredSandwiches, setFilteredSandwiches] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    const handleFilter = (e) => {
        const searchWord = e.target.value
        setWordEntered(searchWord)
        const newFilter = sandwiches.filter((value) => {
            return value.sandwich_name.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === ""){
            setFilteredSandwiches([])
        } else {
            setFilteredSandwiches(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredSandwiches([])
        setWordEntered("")
    }

    return (
        <div className="sandwich-search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                <div className="searchIcon">
                    {filteredSandwiches.length === 0 ? <SearchIcon /> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            {filteredSandwiches.length != 0 && (
            <div className="dataResult">
                {filteredSandwiches.slice(0, 15).map((value, key) => {
                    return (
                    <a className="sandwichItem"> 
                        <p>
                            <Link className="link-to-sandwich-profile" to={`/sandwiches/${value.id}`}>{value.sandwich_name}</Link>
                        </p>
                    </a>)
                })}
            </div>
            )}
        </div>
    )

}

export default SearchBar