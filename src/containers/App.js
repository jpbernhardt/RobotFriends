import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


/* const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())   // same as: requestRobots(dispatch)
  }
} */


const App = () => {
  const dispatch = useDispatch();

  const { searchField } = useSelector(state => state.searchRobots)
    
  const { robots, isPending, error } = useSelector (state => state.requestRobots)

  useEffect(() => {
      onRequestRobots()
    }, []);

  /* const [robots, setRobots] = useState([]); */
  /* const [searchField, setSearchField] = useState(''); */

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  }

  const onRequestRobots = () => {
    dispatch(requestRobots());
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

    if (isPending) {
      return <h1 className='tc'>Loading</h1>
    }
    if (!error) {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      )
    }
  };

export default App;