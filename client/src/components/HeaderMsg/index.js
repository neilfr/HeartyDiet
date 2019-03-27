import React from "react";
import "./style.css";
import { Col, Row, Container } from "./components/Grid";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function HeaderMsg(props) {
  
  return (
    <span {...props}>
      <Container>
        <Row>
          <Col size="md-12 sm-12">
            <div className="text-center wow fadeInUp mt-5">
              <h2>Add a Food Item Here</h2>
              <br />
              <h4>{props.children}</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </span>
  );
}

export default HeaderMsg;
