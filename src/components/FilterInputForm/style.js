import styled from "styled-components";

export const Text = styled.div`
font-size: ${({ size }) => size};
font-weight: ${({ bold }) => (bold ? "700" : "400")};
font-family: Roboto;

  `;

export const Form = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 500px;
  `;

export const Input = styled.input`
background: #303030;
padding: 0.5em;
margin: 0.5em;
color: white;
border-color: #444444;
border-radius: 6px;
outline: none ;
font-family: Roboto;

`;

export const Field = styled.div`
display: flex;
align-items: center;

`;