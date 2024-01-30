import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchList from "./SearchList";
import SearchBar from "./SearchBar";


function SearchSandwiches() {
// /sandwiches

    const value = useContext(ThemeContext)
    const [sandwiches, setSandwiches] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("/sandwiches")
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    const filteredSandwiches = sandwiches.filter(sandwich => {
        return sandwich.sandwich_name.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className = "Sandwich-main">
            <h1>Sandwich Search</h1>
            <div>
                {filteredSandwiches.map((sandwich) =>
                    <SearchList key={sandwich.id} sandwich={sandwich} />
                )}
                <SearchBar search = {search} updateSearch = {updateSearch} />
            </div>
        </div>
    )
}

export default SearchSandwiches