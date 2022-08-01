import React from 'react';
import { useState, useEffect} from "react";
import PMainFrame from './PMainFrame';
import MMainFrame from './MMainFrame';

function PMainPage(props) {
    /**반응형 상태관리 */
    const [screenSize, setScreenSize] = useState(1000);

    /**브라우저 창 크기 구하는 함수 */
    const getScreenSize = () => {
        let size = window.innerWidth;
        setScreenSize(size);
        return size;
      }

    useEffect(() => {
        //브라우저 사이즈 구하기
        getScreenSize();
    },[])  


    return (
        <div>
            {
                screenSize < 960?
                <MMainFrame/>:
                <PMainFrame/>
            }
        </div>
    );
}
export default PMainPage;