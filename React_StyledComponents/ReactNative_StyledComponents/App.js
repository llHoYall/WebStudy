import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 32px;
`;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Text>Open up App.js to start working on your app!</Text>
      </Container>
    );
  }
}
