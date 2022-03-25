import {useState, useEffect} from "react";
import axios from "axios";
import List from "./List"
import styled from "styled-components";

function Main() {
    // const [rows, setRows]= useState(1)


  return (

     <div>

    </div>

  );
}

export default Main;

const Form = styled.form`
  div.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: left;
  }

  input.small{
    flex-basis: 50%;

    &:hover {
      background-color: #EEEEEE;
      color: black;
    }
  }

  input.body{
    flex-basis: 100%;

    &:hover {
      background-color: #EEEEEE;
      color: black;
    }
  }

  button{
    background-color: #AAF0FF;
    color: black;

    &:hover {
      background-color: #87CEFA;
    }
  }
`