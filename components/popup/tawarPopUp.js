import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;


export default function TawarPopUp({
  token,
  handletawar,
  product_name,
  product_image,
  product_price,
  product_id,
  user,
}) {
  const router = useRouter();

  //handle masing-masing inputan pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };


  const [orderData, setOrderData] = useState({
    product_id: null,
    order_price: "",
  });

  const handleSubmit = async (e) => {
    console.log('tes');
    e.preventDefault();
    const data = new FormData();
    data.append("product_id", product_id);
    data.append("order_price", Number(orderData.order_price));

    //jika user belum login /token tdk ada
    if (token) {
      //validasi jika order_price tdk diinput user
      if (orderData.order_price != "") {
        //jika data nomor telepon user tidak null
        if (user.user_phone != null) {
          try {
            await axios({
              method: "post",
              url: `${API}/orders`,
              data: data,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `multipart/form-data`,
              },
            });
            handletawar();
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Penawaranmu berhasil terkirim. Silahkan tunggu seller menghubungi melalui Whatsapp',
              showConfirmButton: false,
              timer: 2000,
            })
            router.replace("/");

          } catch (error) {
            console.log(error.response);
          }
        } else { //jika data nomor telepon user null
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lengkapi Profil Terlebih Dahulu',
          })
          router.replace("/info-profile");
        }

      } else { //jika order price tidak diisi
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Masukkan Order Price',
        })
      }

    } else { // Jika user belum login
      handletawar();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login to continue',
      })
      router.replace("/account/login");
    }
  };


  return (
    <MainModalLayout
      onClick={handletawar}
      title={`Masukkan Harga Tawaranmu`}
      description={`Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.`}
    >
      <div
        className="d-flex p-2"
        style={{ backgroundColor: "#EEEEEE", borderRadius: "8px" }}
      >
        <img
          src={product_image}
          alt=""
          style={{ height: "48px", borderRadius: "8px", marginRight: "4px" }}
        />
        <div>
          <b>{product_name}</b>
          <p className="m-0 p-0">RP {product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
        </div>
      </div>
      <p className="m-0">Harga Tawar</p>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          name="order_price"
          className="card mb-3 mt-1 p-1"
          style={{ borderRadius: "8px", width: "100%" }}
          type="number"
          placeholder="Rp 0,00"
          onChange={(e) => handleChange(e)}
        />
        <CategoryCard
          className={"py-2"}
          text={"Kirim"}
          rad={"8"}
          type="submit"
        />

      </form>
    </MainModalLayout>
  );
}
