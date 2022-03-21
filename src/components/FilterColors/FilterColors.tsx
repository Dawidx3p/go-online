import React from "react";
import './FilterColors.scss';
import type {Filters} from '../../App';

const FilterColors = (props: {filters: Filters, setFilters: (filters: Filters) => void}) => {
    const {filters, setFilters} = props;
    return(
        <form className="filter-colors">
            <h1>Filters</h1>
            {Object.keys(filters).map((filter, key) => <div className="filter" key={key}>
                <div>
                    <input name={filter} value={filters[filter]} placeholder={filter}
                    onChange={(e) => {
                        const target = e.target
                        if((parseInt(target.value)>=0 && parseInt(target.value)<=100) || !target.value){
                            setFilters({...filters, [filter]: target.value})
                        }
                    }} />
                </div>
                
            </div>
            )}
        </form>
    )
}

export default FilterColors;