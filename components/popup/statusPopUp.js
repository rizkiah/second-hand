import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";



const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function StatusPopUp({ onClick, transaction, token }) {

  const router = useRouter();
  const [orderStatusId, setOrderStatusId] = useState(null);

  const handleSubmit = async (e) => {
    // alert('transaksi id :' + orderStatusId + transaction.id);
    e.preventDefault();
    if (orderStatusId != null) {
      try {
        await axios({
          method: "put",
          url: `${API}/orders/${transaction.id}`,
          data: {
            "order_status": orderStatusId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Update Status Berhasil',
          showConfirmButton: false,
          timer: 2000,
        })
        router.reload();

      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setOrderStatusId(value);
  };
  return (
    <MainModalLayout onClick={onClick} title={`Perbarui Status Penjualan Produkmu`}>

      <form onSubmit={handleSubmit} className="d-flex flex-column my-2">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="Diterima" value={1} onChange={handleChange} />
          <label className="form-check-label" htmlFor="Diterima">
            <b htmlFor="html">Berhasil terjual</b>
            <p htmlFor="html">Kamu telah sepakat menjual produk ini kepada pembeli</p>
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="Ditolak" value={2} onChange={handleChange} />
          <label className="form-check-label" htmlFor="Dikirim">
            <b htmlFor="html">Batalkan transaksi</b>
            <p htmlFor="html">Kamu membatalkan transaksi produk ini dengan pembeli</p>
          </label>
        </div>

        <CategoryCard
          className={"py-2 my-2"}
          text={"Kirim"}
          rad={"8"}
          type="submit"
        />

      </form>
    </MainModalLayout>
  );
}
