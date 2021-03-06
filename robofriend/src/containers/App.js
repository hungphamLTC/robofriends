import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import "./App.css";
//Statefull app component as a Parent of CardList and SearchBox
class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            robots : [], // users data will be fetched and stored here
            searchField: '', // User type search on input field and the text user typed will be stored here
            errors: '' // errors catched while using API will be stored here
        }
        this.searchChange = this.searchChange.bind(this); // bind searchChange method to the App class.
    }


    componentDidMount(){
        // Using Browser method fetch to fetch data from API
        // makeSerRequest will be javascript Promise
        const makeServerRequest =  fetch('https://jsonplaceholder.typicode.com/users');

        // Promise catching when error happens. -> Handling Rejected Promise
        makeServerRequest.catch(error => {
            this.setState({errors: 'There are some errors when loading data from API. Please try again later'});
        })


        // Handling a Fulfilled Promise 
        makeServerRequest.then(res=>{
            const resultPromise = res.json();// resultPromise will be another javascript Promise which will contained Users array that is fetch from API

            // if we fetch the data from API successfully. Store the data to robots State
            resultPromise.then(users=>{
                this.setState({robots: users})
            })
            // if error happense, catch it and show nice notice to user
            resultPromise.catch(error=>{
                this.setState({errors: 'There are some errors when loading data from API. Please try again later'});
            })
        })
        
    }

    // method will be triggered when the user type in the SearchBox field
    searchChange = (event)=>{
        this.setState({
            searchField: event.target.value // get the value that user type in the searchbox to store to searchField State
        });
    }

    render(){
        const {robots, searchField, errors} = this.state;
        const filterRobot = robots.filter(robot=>{
            //check robot names and comparing with user text
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        if(robots.length === 0){ // we cannot fetch any data from API, show this error
            return(
                <h3>{errors}</h3>
            );
        }else{ // if we have fetched data, show below according to filered robot.
            return(
                <div className='tc'>
                    <h1 className="f1 robo-friend ">Robo Friends</h1>
                    <SearchBox onSearchChange = {this.searchChange}/>
                    <Scroll>
                        <CardList robots = {filterRobot}/>
                    </Scroll>
                    
                </div>
            );
        }
        
    }
}

export default App;