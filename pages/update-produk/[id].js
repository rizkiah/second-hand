import React from "react";
import Head from "next/head";
import UpdateProdukLayout from "../../layout/updateprodukForm";
import Top from "../../components/top";
import useResize from "../../hooks/useResize";
import { GetToken } from "../../utils/getToken";
import axios from "axios";

export async function getServerSideProps(context) {
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  let product = [];
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  try {
    const res_product = await axios({
      method: `get`,
      url: `${API}/products/${context.query.id}`
    });
    product = res_product.data.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      token,
      product,
    },
  };
}


export default function AddProduk({product, token}){

  const screen = useResize();
  console.log(product);
  return (
    <>
      <Head>
        <title>Update Produk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {screen.md ? (
        <Top />
      ) : (
        <div className="d-flex d-row gap-2 m-3 fw-bold fs-4 justify-content-center">
          <i className="bi bi-arrow-left pe-3"></i>
          <p className="">Lengkapi Detail Produk</p>
        </div>
      )}

      {screen.md ? (
        <div className="col-6 offset-3 mt-3 d-flex flex-column justify-content-center">
          <i className="bi bi-arrow-left fs-3 mt-2"></i>

          <UpdateProdukLayout product={product} token={token}/>
        </div>
      ) : (
        <div className="px-3">
          <UpdateProdukLayout product={product} token={token} />
        </div>
      )}
    </>
  );
}