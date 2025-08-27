import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { use, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function MemberAdd() {
  const [id, setId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSaveClick() {
    // post
    axios
      .post("/api/member/add", {
        id: id,
        password1: password1,
        name: name,
        phone: phone,
        email: email,
      })
      .then((res) => {
        console.log("잘됌");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={3}>
        <h2 className="mb-4">회원 가입</h2>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>아이디</FormLabel>
            <FormControl
              value={id}
              onChange={(e) => setId(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              value={password1}
              onChange={(e) => setPassword1(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>비밀번호 확인</FormLabel>
            <FormControl
              value={password2}
              onChange={(e) => setPassword2(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>이름</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>전화번호</FormLabel>
            <FormControl
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormCheck
              label="남"
              type="checkbox"
              name="gender"
              value={male}
              reverse
            ></FormCheck>
          </FormGroup>
        </div>
        <div>
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
        <div>
          <Button onClick={handleSaveClick}>가입</Button>
          <Button className="btn btn-secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
        </div>
      </Col>
    </Row>
  );
}
