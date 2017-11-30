import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDates from '../dates';
import {clues} from '../constants';
import styled from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 4.5em;
  text-align: center;
  color: palevioletred;
  margin-bottom: .5em;
  color: #b81313;
  font-family: 'Berkshire Swash', cursive;
  font-weight: normal;
  text-align: center;
  text-shadow: 0 .05em .1em #fff;
  animation-name: hover;
  animation-iteration-count: infinite;
  animation-duration: 3.5s;
`;

const CalendarWindowClosed = styled.div`
  width: 190px;
  height: 190px;
  background-color: transparent;
  border: 2px dashed black;
  float: left;
  padding: 10px;
  margin: 10px;
`;

const CalendarWindowOpen = styled.div`
  width: 190px;
  height: 190px;
  background-color: black;
  border: 2px dashed black;
  float: left;
  padding: 10px;
  margin: 10px;
  color: white;
  font-family: 'Tangerine', cursive;
  font-size: 40px;
`;

class Calendar extends Component {
  render() {
    var windows = clues.map((clue, index) => {
      return this.props.openList[index] ?
        <CalendarWindowOpen onClick={()=>this.props.onToggleWindow(index)} key={index}>
          {clue}
        </CalendarWindowOpen> :
        <CalendarWindowClosed onClick={()=>this.props.onToggleWindow(index)} key={index}>
          {index + 1}
        </CalendarWindowClosed>
    })
    return (
      <div>
        <Title>
          Merry Christmas Indigo
        </Title>
        <div>
          {windows}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openList: state
  }
}

const ToggleWindow = (index) => {
  return {
    type: 'TOGGLE_WINDOW',
    index: index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleWindow: (index) => {
      dispatch(ToggleWindow(index))
    }
  }
}

Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)
export default Calendar