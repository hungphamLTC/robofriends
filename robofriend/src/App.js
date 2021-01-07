import React from 'react';
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            robots : robots,
            searchField: ''
        }
        this.searchChange = this.searchChange.bind(this);
    }

    searchChange = (event)=>{
        this.setState({
            searchField: event.target.value
        });
    }

    render(){
        const filterRobot = this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        });
        return(
            <div className='tc'>
                <h1>Robo Friends</h1>
                <SearchBox onSearchChange = {this.searchChange}/>
                <CardList robots = {filterRobot}/>
            </div>
        );
    }
}

export default App;