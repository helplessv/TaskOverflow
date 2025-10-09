import {styled} from "styled-components";
import { useRef, useEffect, useState } from "react";

const StyledListcomp = styled.div`
    display: flex;
    justify-content: space-between;
    width: 680px;
    height: 40px;
    padding: 10px;
    div{
        align-items:center;
        text-align:center;
        display:flex;
        width: 150px;
        padding-left:20px;
    }
    .status{
        justify-content:center;
        padding-left:0;
    }
`;

        

export default function Listcomp({ items = [] }) {
    return (
        <>
            <StyledListcomp>
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={((idx + 1) % 4 === 0) ? "status" : ""}
                    >
                        {item}
                    </div>
                ))}
            </StyledListcomp>
            <hr/>
        </>
    );
}
