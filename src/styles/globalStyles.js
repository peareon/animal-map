import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        padding: 55px;
        box-sizing: border-box;
        max-height: 100vh;
        overflow: visible;
        background-color: #86c59e;
        font-family: 'Trebuchet MS';
    }
    a{
        text-decoration: none;
    }
    .mainContainer{
        display: flex;
        gap: 10%;
    }
    button{
        color: #E8F5BD;
        background-color: #84B179;
        padding: 5px;
        border-radius: 5px;
        margin: 0px;
        width: 100%;
        margin: auto;
        cursor: pointer;
        outline: none;
        border: none;
        &:hover{
            background-color: #237227;
            color: white;
        }
    }
    input{
        outline: none;
        border: none;
        border-radius: 5px;
        width: 98%;
    }
    a{
        text-decoration: none;
        color: #053f00;
    }
`

export default GlobalStyle