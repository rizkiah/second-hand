import React, { useState } from "react";
import { useRouter } from "next/router";
import FormData from "form-data";
import axios from "axios";
import cookie from "js-cookie";
import Head from "next/head";
import LoginregisterLayout from "../../layout/loginregisterLayout";
import CategoryCard from "../../components/categoryCard";
import InputBox from "../../components/inputBox";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [userData, setUserData] = useState({
    user_email: "",
    user_password: "",
    user_role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_email", userData.user_email);
    data.append("user_password", userData.user_password);
    // data.append("user_role", Number(userData.user_role));

    try {
      const res = await axios({
        method: "post",
        url: `${API}/users/login`,
        data: data,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      cookie.set("token", res.data.token)
      router.replace("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginregisterLayout>
        <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>
          Masuk
        </h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <div className="col-12 mt-2">
            <label>Email</label>
            <InputBox
              type="email"
              name="user_email"
              className="form-control mt-2"
              placeholder="Contoh: johndee@gmail.com"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col-12 mt-2">
            <label>Password</label>
            <InputBox
              type="password"
              name="user_password"
              onChange={(e) => handleChange(e)}
              className="form-control mt-2"
              placeholder="Masukkan password"
            />
          </div>

          {/* <div className="col-12 mt-2">
            <label>Role</label>
            <select
              required
              name="user_role"
              className="form-select mt-2"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
            >
              <option value="">Pilih Role</option>
              <option value="1">Buyer</option>
              <option value="2">Seller</option>
            </select>
          </div> */}

          <div className="mt-4 mb-4 text-center fw-bold">
            <div className="start-0 end-0 d-flex">
              <CategoryCard
                type="submit"
                className="p-3 flex-grow-1"
                text="Masuk"
                rad="16"
              />
            </div>
          </div>
        </form>
        <h5 className="d-flex justify-content-center">
          Belum punya akun?&nbsp;
          <Link href={"/account/register"}>
            <a style={{ color: "var(--purple)", textDecoration: "none" }}>
              Daftar disini
            </a>
          </Link>
        </h5>
      </LoginregisterLayout>
    </>
  );
}
