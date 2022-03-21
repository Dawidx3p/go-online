import React from "react";
import './ColorList.scss';

import type {Color, Filters} from '../../App';
import filterColors from "./FiltredColors";

type State = {
}
type Props = {
    colors: Color[],
    filters: Filters,
    deleteColor: (id:number) => void
}

class ColorList extends React.Component<Props, State>{
    render(){
        return(
            <div className="color-list">
                {filterColors(this.props.colors, this.props.filters).map((color, key) => {
                    if(color.type==='RGB'){
                     return <div key={key} className="color">
                        <div className="colored" style={{backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`}}></div>
                        <div className="description">
                            <p>{color.name}</p>
                            <p>{`(${color.red}, ${color.green}, ${color.blue})`}</p>
                            <button hidden={color.default} onClick={() => this.props.deleteColor(color.id)}>Delete</button>
                        </div>
                     </div>
                    }else{
                     return <div  key={key} className="color">
                        <div className="colored" style={{backgroundColor: color.hex}}></div>
                        <div className="description">
                            <p>{color.name}</p>
                            <p>{color.hex}</p>
                            <button  hidden={color.default} onClick={() => this.props.deleteColor(color.id)}>Delete</button>
                        </div>
                     </div>
                    }
                }
                )}
            </div>
        )
    }
    
}

export default ColorList;