import React, { useEffect, useState } from "react";
import moment from "moment";
import CategoryCard from "./categoryCard";
import StatusPopUp from "./popup/statusPopUp";

function ItemList({ transaction, token }) {

  //untuk menampilkan status popup
  const [statusPopUp, setStatusPopUp] = useState(false);
  const handleStatusOrder = () => setStatusPopUp((statusPopUp = !statusPopUp));



  return (
    <>
      <div className="p-2 d-flex gap-3 container-fluid my-2" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)" }}>
        <div style={{ width: "20%" }}>
          <img
            style={{ width: "100%", borderRadius: "12px" }}
            src={transaction.Product.product_image}
            alt={transaction.Product.product_name}
          />
        </div>
        <div className="p-2 d-flex flex-column flex-grow-1">
          <div className="d-flex flex-grow">
            <p className="m-0">Penawaran Produk</p>
            <p className="m-0 ms-auto">
              {moment(transaction.createdAt).format("hh:mm:ss DD MMM, YYYY")}
            </p>
            <CategoryCard
              className="px-1 py-2 ms-2"
              text="Update Status"
              rad={10}

              onClick={handleStatusOrder}
            />
          </div>

          <h4>{transaction.Product.product_name}</h4>

          <p className="fw-bold">Status Penawaran : {transaction.order_status == 0 ? "Menunggu Konfirmasi" : transaction.order_status == 1 ? "Diterima" : transaction.order_status == 2 ? "Ditolak" : "null"}</p>
          <p className="m-0">
            Rp.{" "}
            {transaction.Product.product_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
          <p className="m-0">
            Ditawar Rp.{" "}
            {transaction.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>


      </div>
      {/* untuk menghilangkan status popup */}
      {statusPopUp && (
        <StatusPopUp
          onClick={handleStatusOrder}
          transaction={transaction}
          token={token}
        />
      )}
    </>
  );
}

export default ItemList;
