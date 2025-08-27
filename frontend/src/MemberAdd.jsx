import {
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { use, useState } from "react";

export function MemberAdd() {
  const [name, setName] = useState("");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Row>
      <Col xs={12} md={8} lg={6}>
        <h2>회원 가입</h2>
        <div>
          <FormGroup>
            <FormLabel>이름</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>전화번호</FormLabel>
            <FormControl
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>이메일</FormLabel>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormCheck
              label="남"
              type="checkbox"
              name="gender"
              value={male}
              reverse
            ></FormCheck>
          </FormGroup>
          <FormGroup>
            <FormCheck
              label="여"
              type="checkbox"
              name="gender"
              value={female}
              reverse
            ></FormCheck>
          </FormGroup>
        </div>
      </Col>
    </Row>
  );
}
