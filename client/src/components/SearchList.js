import React from "react";

function SearchList({sandwich}) {

    return (
        <ul className="Sandwich-List">
            <img src={sandwich.image} alt={sandwich.name} />
        </ul>
    )
}

export default SearchList