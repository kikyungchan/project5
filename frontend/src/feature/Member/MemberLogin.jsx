import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";

export function MemberLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);
  const [password, setPassword] = useState("");
  const [loginId, setLoginId] = useState("");

  function handleLogInButtonClick(e) {
    e.preventDefault();
    axios
      .post("/api/member/login", { loginId: loginId, password: password })
      .then((res) => {
        const token = res.data.token;
        login(token);

        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }

        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("로그인 중 오류가 발생했습니다.", { type: "error" });
          console.error("로그인 에러:", err);
        }
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={3}>
        <h2>로그인</h2>
        <Form onSubmit={handleLogInButtonClick}>
          <FormGroup>
            <FormLabel>아이디</FormLabel>
            <FormControl
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">로그인</Button>
          <Button className="btn btn-secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
