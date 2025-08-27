import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function MemberAdd() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSaveClick() {
    // post
    axios
      .post("/api/member/add", {
        loginId: loginId,
        password: password,
        name: name,
        phone: phone,
        email: email,
        gender: gender,
      })
      .then((res) => {
        console.log("잘됌");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log("안됌");
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      });
  }

  // 이메일, 암호, 별명 입력하지 않으면 가입버튼 비활성화

  let disabled = false;
  if (email === "") {
    disabled = true;
  }
  if (password === "") {
    disabled = true;
  }
  if (loginId === "") {
    disabled = true;
  }
  if (gender === null || gender === "") {
    disabled = true;
  }
  // password와 password2가 일치하지 않으면 비활성화
  let passwordConfirm = true;
  if (password !== password2) {
    disabled = true;
    passwordConfirm = false;
  }
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={3}>
        <h2 className="mb-4">회원 가입</h2>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>아이디</FormLabel>
            <FormControl
              value={loginId}
              onChange={(e) => setLoginId(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>비밀번호 확인</FormLabel>
            <FormControl
              value={password2}
              onChange={(e) => setPassword2(e.target.value.trim())}
            />
            {passwordConfirm || (
              <FormText className="text-danger">
                패스워드가 일치하지 않습니다.
              </FormText>
            )}
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>이름</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>전화번호</FormLabel>
            <FormControl
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormCheck
              label="남"
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              reverse
            ></FormCheck>
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormCheck
              label="여"
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              reverse
            ></FormCheck>
          </FormGroup>
        </div>
        <div>
          <Button onClick={handleSaveClick} disabled={disabled}>
            가입
          </Button>
          <Button className="btn btn-secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
        </div>
      </Col>
    </Row>
  );
}
