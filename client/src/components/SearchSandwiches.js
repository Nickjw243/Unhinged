import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchList from "./SearchList";
import SearchBar from "./SearchBar";


function SearchSandwiches() {
// ./sandwiches

    const value = useContext(ThemeContext)
    const [sandwiches, setSandwiches] = useState([])

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    return (
        <div className = "Sandwich-main">
            <h1>Sandwich Search</h1>
            <div>
                <SearchBar placeholder="Search for Sandwich..." sandwiches={sandwiches} />
            </div>
        </div>
    )
}

export default SearchSandwiches