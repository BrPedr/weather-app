import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  height: 550px;

  padding: 30px 0;
  margin: 0 10px;

  background: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border-radius: 15px;

  font-size: 10px;

  cursor: pointer;

  img {
    width: 250px;
    height: 250px;
  }

  header {
    font-size: 20px;
    font-weight: 600;
  }

  .bottom-text {
    text-align: center;

    div ~ h2 {
      font-size: 40px;
      font-weight: 300;
    }
  }
`;

export const Contition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 2;

  h2 {
    font-size: 60px;
  }

  h3 {
    font-size: 30px;
    font-weight: 300;
  }
`;
