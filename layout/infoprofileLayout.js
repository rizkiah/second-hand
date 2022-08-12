/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import axios from "axios";
import cookie from "js-cookie";
import { GetToken } from "../utils/getToken";
import FormData from "form-data";
import Swal from "sweetalert2";


const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function InfoProfileLayout({ user, token }) {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [userData, setUserData] = useState({
    user_name: user.user_name,
    user_province: user.user_province,
    user_regency: user.user_regency,
    user_address: user.user_address,
    user_phone: user.user_phone,
    user_image: user.user_image,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_name", userData.user_name);
    data.append("user_province", userData.user_province);
    data.append("user_regency", userData.user_regency);
    data.append("user_address", userData.user_address);
    data.append("user_phone", userData.user_phone);
    data.append("user_image", userData.user_image);

    try {
      await axios({
        method: "put",
        url: `${API}/users`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Update Profile Berhasil',
        showConfirmButton: false,
        timer: 2000,
      })

      router.back();
    } catch (error) {
      console.log(error.response);
    }
  };

  const getProvince = async (e) => {
    const res_province = await axios.get(
      "https://svc-eterno-rails.herokuapp.com/api/v1/provinces"
    );
    setProvinces(res_province.data.data);
  };

  const getUsers = async (e) => {
    const res_user = await axios.get(`${API}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(res_user.data.data);
    console.log();
  };

  async function getRegency(e) {
    const val = e.target.value;
    const provinceCode = val.slice(0, 2);
    const provinceName = val.slice(2);
    setUserData((prev) => ({ ...prev, user_province: provinceName }));

    const res_regency = await axios.get(
      `https://svc-eterno-rails.herokuapp.com/api/v1/regencies?province_code=${provinceCode}`
    );
    setRegencies(res_regency.data.data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeFile = (e) => {
    setUserData((prev) => ({ ...prev, user_image: e.target.files[0] }));
  };

  useEffect(() => {
    getUsers(), getProvince();
  }, []);



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="col-12 mt-2 text-center">
            <div className="col-12">
              <img className="img-preview"
                src={userData.user_image}
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div className="col-12 mt-2">
              <div className="image-upload">
                <label for="file-input">
                  <i className="bi bi-pencil-fill mt-2">Edit Foto</i>
                </label>
                <input
                  id="file-input"
                  name="user_image"
                  onChange={(e) => handleChangeFile(e)}
                  type="file"
                  hidden
                />
              </div>
            </div>
          </div>

          <div className="col-12 mt-2">
            <label>Nama</label>
            <InputBox
              type="text"
              name="user_name"
              className="form-control mt-2"
              placeholder="Masukan Nama"
              value={userData.user_name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col-12 mt-2">
            <label>Provinsi</label>
            <select
              name="user_province"
              className="form-select mt-2"
              aria-label="Default select example"
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
              onChange={(e) => getRegency(e)}
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map((province) => (
                <option
                  selected={province.name == userData.user_province}
                  value={`${province.province_code}${province.name}`}
                  key={province.id}
                >
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 mt-2">
            <label>Kota</label>
            <select
              name="user_regency"
              className="form-select mt-2"
              aria-label="Default select example"
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
              onChange={(e) => handleChange(e)}
            >
              <option value="">
                {userData.user_regency == null
                  ? "Pilih kota"
                  : userData.user_regency}
              </option>
              {regencies.map((regency) => (
                <option
                  selected={regency.name == userData.user_regency}
                  value={regency.name}
                  key={regency.id}
                >
                  {regency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mt-2">
            <label>Alamat</label>
            <textarea
              className="form-control mt-2"
              name="user_address"
              rows="2"
              placeholder="Contoh: Jalan Ikan Hiu 33"
              value={userData.user_address}
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                background: "#FFFFFF",
                display: "flex",
              }}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="col-12 mt-2">
            <div className="col-12 mt-2">
              <label>No Handphone*</label>
              <InputBox
                type="number"
                name="user_phone"
                className="form-control mt-2"
                placeholder="Contoh: 083180217394"
                value={userData.user_phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 mt-5 mb-5 fw-bold">
              <div className="start-0 end-0 d-flex">
                <CategoryCard
                  className="p-3 flex-grow-1"
                  text="Simpan"
                  rad="16"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InfoProfileLayout;
