import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const history = useHistory();
  const { setLogin } = props;
  const [settings, setSettings] = useState([]);
  const settingRef = ref(db, "settings");

  const [info, setInfo] = useState({});

  useEffect(() => {
    onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });
  }, []);

  const handleOnChnage = (e, evname) => {
    setInfo({ ...info, [evname]: e.target.value });
  };
  const handleLogin = () => {
    if (info.password == settings.password && info.email == settings.email) {
      toast.success("Login successfully.");
      setLogin(true);
      history.push("/admin");
    } else {
      toast.error("Login failed.");
    }
  };

  return (
    <React.Fragment>
      <div className="container pp-detail-content">
        <h1 className="py-3 text-center">Login</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 col-12 card py-2 px-4 my-3">
            <div className="w-100 my-2">
              <h5>Email</h5>
              <input
                className="form-control"
                type="email"
                placeholder="user@gmail.com"
                onChange={(e) => handleOnChnage(e, "email")}
              />
            </div>
            <div className="w-100 my-2">
              <h5>Password</h5>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                onChange={(e) => handleOnChnage(e, "password")}
              />
            </div>
            <div className="w-100 my-2 text-center">
              <button
                className="btn-primary py-2 px-4"
                onClick={() => handleLogin()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
