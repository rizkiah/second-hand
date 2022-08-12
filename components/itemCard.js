import React from "react";

function ItemCard({ name, price, category, image }) {
  return (

    <div className="card p-2" style={{ height: "100%" }}>
      <img className="rounded" src={image} alt={name} />
      <h6 className="mt-2 fw-bold">{name}</h6>
      <p className="mb-1 defaultColor">{category}</p>
      <h5>Rp {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
    </div>

  );
}

export default ItemCard;
