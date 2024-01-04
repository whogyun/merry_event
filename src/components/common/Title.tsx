import styled from "styled-components";

const Title = styled("div")`
  font-size: 15px;
  letter-spacing: 0.5em;
  line-height: 1.2em;
  font-family: "Bodoni 72";
  font-weight: 500;
  color: #868383;

  @keyframes smoothAppear2 {
    from {
      opacity: 0;
      transform: translateY(30%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: smoothAppear2 1s;
`;

export default Title;
