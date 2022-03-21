import React from 'react';
import { fetchColors, updateColors } from './api';
import './App.scss';
import AddColor from './components/AddColor/AddColor';
import ColorList from './components/ColorList/ColorList';
import FilterColors from './components/FilterColors/FilterColors';

export type Color = {
  id: number,
  name: string,
  type: string,
  red?: string,
  green?: string,
  blue?: string,
  hex?: string,
  default?: boolean
}

export type Filters ={
  [filter: string]: string,
} 

type State = {
  colors: Color[],
  filters:Filters
}

type Props = {
}

class App extends React.Component <Props, State> {
  state: {colors: Color[], filters: Filters} = {
    colors: [{id: 0,name: 'amaranth', type: 'HEX', hex: '#e52b50', default: true}, 
    {id: 1,name: 'vermilion', type: 'HEX', hex: '#E34234', default: true},
    {id: 2,name: 'Coquelicot', type: 'RGB', red: '256', green: '56', blue: '0', default: true}],
    filters: {red: '', green: '', blue: '', saturation: ''}
  }

  addColor = (color: Color) => {
    this.setState( prevState => ({
      ...prevState,
      colors: [...prevState.colors, color]
    }))
  }

  deleteColor = (id: number) => {
    this.setState( prevState => ({
      ...prevState,
      colors: prevState.colors.filter(color => color.id!==id)
    }))
  }

  setFilters = (filters:Filters) => {
    this.setState( prevState => ({
      ...prevState,
      filters: filters
    }))
  }

  componentDidUpdate(){
    updateColors(this.state.colors)
  }

  componentDidMount(){
    const colors: Color[]|undefined = fetchColors();
    if(colors){
        this.setState(prevState => ({
          ...prevState,
          colors
        }))
    }
  }

  render(){
    return (
      <div className='app'>
      <AddColor addColor={this.addColor}/>
      <FilterColors filters={this.state.filters} setFilters={this.setFilters}/>
      <ColorList filters={this.state.filters} colors={this.state.colors} deleteColor={this.deleteColor}/>
      </div>
    );
  }
}

export default App;
