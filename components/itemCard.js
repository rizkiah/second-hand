import React from "react";

function ItemCard({ name, price, category, image }) {
  return (

    <div className="card p-2" style={{ height: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)" }} >
      <img className="rounded" src={image} alt={name} height={"150px"} />
      <h5 className="mt-2  ms-2 fw-bold">{name}</h5>
      <p className="mb-1 ms-2 defaultColor">{category}</p>
      <h5 className="mb-3 ms-2" >Rp {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
    </ div>

  );


}

export default ItemCard;
