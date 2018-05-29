import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import Store from "store";

const Notification = styled.div`
  width: 80%;
  margin-bottom: 15px;
  border: 2px solid ${props => (props.seen ? "transparent" : "#f1c40f")};
  border-radius: 15px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

const Title = styled.span`
  font-weight: 600;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background-color: ${props => {
    if (props.seen) {
      return "#7f8c8d";
    } else if (props.success) {
      return "#2ecc71";
    } else if (props.danger) {
      return "#e74c3c";
    }
  }};
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(1px);
  }
`;

const NotificationPresenter = ({ id, text, seen }) => (
  <Notification seen={seen}>
    <Flex alignCenter justifyBetween>
      <Title>{text}</Title>
      <FlexItem>
        <Fragment>
          <Store.Consumer>
            {store => (
              <Fragment>
                <Button
                  success
                  seen={seen}
                  onClick={() => store.seeNotification(id)}
                >
                  <FontAwesome name="check" />
                </Button>
                <Button
                  danger
                  seen={seen}
                  onClick={() => store.deleteNotification(id)}
                >
                  <FontAwesome name="times" />
                </Button>
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
  </Notification>
);

NotificationPresenter.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  seen: PropTypes.bool.isRequired
};

export default NotificationPresenter;
