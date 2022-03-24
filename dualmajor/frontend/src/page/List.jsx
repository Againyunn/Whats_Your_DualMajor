import React from 'react'
import styled from 'styled-components'

export default function List(props) {
  function handleClick(){
    props.deletion(props.id)
  }
  return (
    <Note>
      <div className="container">
        <div className='small'>
          <h3>제목: {props.title} </h3>
        </div>
        <div className='small'>
          작성자: {props.writer}
        </div>
        <div className='body'>
          <p>내용: {props.content}</p>
        </div>
        <button onClick={handleClick}>Delete</button>
      </div>
    </Note>
  )
}

const Note = styled.div`
  div.container{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: left;
  }

  div.small{
    flex-basis: 30%;
  }

  div.body{
    flex-basis: 100%;
  }

  button{
    background-color: #AAF0FF;
    color: black;

    &:hover {
      background-color: #87CEFA;
    }
  }
`