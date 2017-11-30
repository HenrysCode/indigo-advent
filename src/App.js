import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './components/Calendar';
import logo from './logo.svg';
import SnowStorm from 'react-snowstorm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SnowStorm />
        <Calendar></Calendar>
      </div>
    );
  }
}

var todoId = 0
const addTodo = (input) => {
  return {
    type: 'ADD_TODO',
    text: input,
    id: todoId++,
  }
}

let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input type="text" ref={(node) => input = node} />
      <button onClick={()=>{
        dispatch(addTodo(input.value));
        input.value =''
      }}>
        Add Todo
      </button>
    </div>
  )
}

AddTodo = connect()(AddTodo)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

let VisibleTodos = (props) => {
  const todos = props.todos.map(todo => {
    return (
      <p key={todo.id} onClick={() => {props.toggleTodo(todo.id)}}>
        {todo.completed ? <s>{todo.text}</s> : todo.text}
      </p>
    )
  })
  return (
    <div>
      {todos}
    </div>
  )
}

const mapTodosStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
}
const mapTodosDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

VisibleTodos = connect(mapTodosStateToProps)(VisibleTodos)


let Footer = (props) => {
  return (
    <div>
      <h1 onClick={() => props.setFilter('SHOW_ALL')}>Show ALL</h1>
      <h1 onClick={() => props.setFilter('SHOW_COMPLETED')}>Show Completed</h1>
      <h1 onClick={() => props.setFilter('SHOW_ACTIVE')}>Show Active</h1>
    </div>
  )
}

const setFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

const mapFilterDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter) => {dispatch(setFilter(filter))}
  }
}

Footer = connect((state) => {}, mapFilterDispatchToProps)(Footer)

let TodoApp = (props) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodos toggleTodo={props.toggleTodo} todos={props.todos} />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    onClick: () => {console.log(state)},
    todos: state.todos,
    filter: state.filter
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => {dispatch({type: 'ADD_TODO', id: todoId++, text: text})},
    toggleTodo: (id) => {dispatch({type: 'TOGGLE_TODO', id: id})},
    selectFilter: () => {}
  }
}

TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default App;
