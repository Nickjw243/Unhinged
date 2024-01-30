import React from "react";

function SearchBar({search, updateSearch}) {


    return (
        <div className="sandwich-search">
                <input
                    type="text"
                    id="search"
                    placeholder="Search for Sandwiches"
                    onChange={updateSearch} value={search} >
                </input>
            </div>
    )

}

export default SearchBar