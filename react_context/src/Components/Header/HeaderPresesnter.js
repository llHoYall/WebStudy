import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import Store from "store";

const Header = styled.header`
  height: 100px;
  margin-bottom: 30px;
  padding: 0 40px;
  background-color: #ecf0f1;
`;

const HeaderIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 30px;
  border-radius: 50 %;
  background-color: #3498db;
  color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  translation: all 0.2s ease - out;
  cursor: pointer;
  &: hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Number = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  left: 25px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #8e44ad;
`;

const getUnseen = notifications => {
  let unseen = [];
  Object.keys(notifications).map(key => {
    if (!notifications[key].seen) {
      return unseen.push(notifications[key]);
    }
  });
  return unseen.length;
};

const HeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <h3>Anti-Redux</h3>
      </FlexItem>
      <FlexItem>
        <Flex>
          <HeaderIcon>
            <FontAwesome name="user" />
          </HeaderIcon>
          <HeaderIcon>
            <FontAwesome name="cog" />
          </HeaderIcon>
          <HeaderIcon>
            <FontAwesome name="bell" />
            <Number>
              <Store.Consumer>
                {store => getUnseen(store.notifications)}
              </Store.Consumer>
            </Number>
          </HeaderIcon>
        </Flex>
      </FlexItem>
    </Flex>
  </Header>
);

export default HeaderPresenter;
