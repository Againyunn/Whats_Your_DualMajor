import React from 'react'
import styled from 'styled-components'

export default function starRate() {
    const drawStar = (e) => {
        document.querySelector(`.star span`).style.width = `${e.target.value * 10}%`;
      }

  return (
    <>
      <StarFrame class="star">
        ★★★★★
        <span>★★★★★</span>
            <input type="range" oninput="drawStar" value="1" step="1" min="0" max="10"/>
        </StarFrame>
    </>
  )
}

const StarFrame =styled.div`
    .star {
        position: relative;
        font-size: 2rem;
        color: #ddd;
    }
    
    .star input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
    
    .star span {
        width: 0;
        position: absolute; 
        left: 0;
        color: red;
        overflow: hidden;
        pointer-events: none;
  }
`