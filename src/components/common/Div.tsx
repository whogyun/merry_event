import styled from "styled-components";

const Div = styled("div")<{$isvisible?:string}>`
  padding: 30px;
  padding-bottom: 120px;

  ${({$isvisible}) => 
    ({opacity: $isvisible==='true' ? '1': '0'})
  }
  

  @media (max-width: 380px) {
    padding: 30px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 80px;
  }

  @keyframes smoothAppear3 {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ${({$isvisible}) => 
    ({animation: $isvisible==='true' ? 'smoothAppear3 2s ease 0.2s': 'none'})
  }
  `;


export default Div;
