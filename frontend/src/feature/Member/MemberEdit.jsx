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
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";

export function MemberEdit() {
  const { user } = useContext(AuthenticationContext);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // 회원정보 불러오기
  useEffect(() => {
    if (user?.loginId) {
      axios
        .get("/api/member?=loginId", { params: { loginId: user?.loginId } })
        .then((res) => {
          const m = res.data;
          setLoginId(m.loginId);
          setName(m.name);
          setPhone(m.phone);
          setEmail(m.email);
          setGender(m.gender);
        })
        .catch((err) => {
          toast("회원 정보를 불러올 수 없습니다.", { type: "error" });
        });
    }
  }, [user]);

  function handleUpdateClick() {
    axios
      .put("/api/member/update", {
        loginId,
        password, // 공란이면 백엔드에서 기존 유지
        name,
        phone,
        email,
        gender,
      })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("회원 정보가 수정되었습니다.", { type: "success" });
        }
        navigate("/mypage");
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("회원정보 수정 중 오류 발생", { type: "error" });
        }
      });
  }

  // password 확인
  let passwordConfirm = true;
  if (password !== password2) {
    passwordConfirm = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={3}>
        <h2 className="mb-4">회원 정보 수정</h2>

        <div>
          <FormGroup className="mb-3">
            <FormLabel>아이디</FormLabel>
            <FormControl value={loginId} disabled />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3">
            <FormLabel>새 비밀번호</FormLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="변경하지 않으려면 비워두세요"
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3">
            <FormLabel>새 비밀번호 확인</FormLabel>
            <FormControl
              type="password"
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
            />
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
            />
          </FormGroup>
        </div>

        <div>
          <Button
            onClick={handleUpdateClick}
            disabled={!passwordConfirm || name === "" || email === ""}
          >
            수정
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => navigate("/mypage")}
          >
            취소
          </Button>
        </div>
      </Col>
    </Row>
  );
}
