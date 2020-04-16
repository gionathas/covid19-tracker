import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

export const TextBoard = ({ title = "Board", items = [] }) => {
  const [visibleItem, setVisibleItem] = useState(items[0]);

  useEffect(() => {
    setVisibleItem(items[0]);
  }, [items]);

  const board = () => {
    if (items.length > 0) {
      return (
        <Card>
          <Card.Header>
            <Nav
              variant="tabs"
              activeKey={visibleItem.navTitle}
              onSelect={(key) => {
                setVisibleItem(items.find((item) => item.navTitle === key));
              }}
            >
              {items.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={item.navTitle}>
                      {item.navTitle}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Title>{visibleItem.subTitle}</Card.Title>
            <Card.Text className="text-danger h2">
              {visibleItem.value}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  };

  return board();
};

export default TextBoard;
