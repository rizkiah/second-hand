import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import ProdukMobileLayout from "../../layout/produkMobile";
import useResize from "../../hooks/useResize";
import ProdukDesktopLayout from "../../layout/produkDesktop";
import { GetToken } from "../../utils/getToken";
import MainButton from "../../components/mainButton";
import TawarPopUp from "../../components/popup/tawarPopUp";
import Swal from "sweetalert2";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getServerSideProps(context) {
  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let product = [];
  try {
    const res = await axios.get(API + "/products/" + context.query.id);
    product = res.data.data;
    const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res_user.data.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      token,
      user,
      product,
    },
  };
}

function Produk({ token, user, product }) {
  const screen = useResize();
  const router = useRouter();

  //state tawar pop up di set false (tidak muncul)
  const [tawarPopup, setTawarPopup] = useState(false);

  //logic untuk menampilkan tawarpop : false->true
  const handleTawarPopup = () => setTawarPopup((tawarPopup = !tawarPopup));

  let isOwner = false;
  if (user != null && product.User.id == user.user_id) {
    isOwner = true;
  }

  const handleEdit = async (e) => {
    router.replace("/update-produk/" + product.id);
  };


  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  //handle delete produk
  const handleDelete = async (e) => {
    console.log("Deleting item...");
    e.preventDefault();
    try {
      await axios({
        method: `delete`,
        url: `${API}/products/${product.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Item being deleted. Please wait.");
    } catch (error) {
      console.log(error);
    }
    router.replace("/seller");
  };

  let images = (
    <img
      className="w-100"
      style={{ borderRadius: "1rem" }}
      src={product.product_image}
      alt="carouselproduk"
    />
  );
  let button = (
    <>
      {isOwner ? (
        <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
          <MainButton
            className="p-3 flex-grow-1 text-center bg-white"
            text="Edit"
            rad="16"
            onClick={(e) => handleEdit(e)}
          />
          <button
            onClick={(e) => handleDelete(e)}
            className={"p-3 flex-grow-1"}
            style={{
              color: "white",
              backgroundColor: "red",
              borderRadius: `16px`,
            }}
          >
            <i className={`bi bi- mx-auto`} style={{ fontSize: "1.5rem" }}></i>
            <p className="m-0 text-center">Delete</p>
          </button>
        </div>
      ) : (
        <CategoryCard
          className="p-3 flex-grow-1"
          text="Saya Tertarik dan Ingin Nego"
          rad="16"
          onClick={handleTawarPopup}
        />
      )}
    </>
  );
  let owner = (
    <OwnerCard
      foto={product.User.user_image}
      fotoalt="fotoalt"
      isOwner={isOwner}
      nama={product.User.user_name}
      kota={product.User.user_regency}
    />
  );
  let information = (
    <div
      className="p-3"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <h4>{product.product_name}</h4>
      <p className="p-0 mb-2">{product.Category.category_name}</p>
      <h5>
        Rp{" "}
        {product.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </h5>
      {screen.md && (
        <div className="start-0 end-0 d-flex">
          {isOwner ? (
            <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
              <MainButton
                onClick={(e) => handleEdit(e)}
                className="p-3 flex-grow-1 text-center bg-white"
                text="Edit"
                rad="16"
              />
              <button
                onClick={(e) => handleDelete(e)}
                className={"p-3 flex-grow-1"}
                style={{
                  color: "white",
                  backgroundColor: "purple",
                  borderRadius: `16px`,
                }}
              >
                <i
                  className={`bi bi- mx-auto`}
                  style={{ fontSize: "1.5rem" }}
                ></i>
                <p className="m-0 text-center">Delete</p>
              </button>
            </div>
          ) : (
            <CategoryCard
              className="p-3 flex-grow-1"
              text="Saya Tertarik dan Ingin Nego"
              rad="16"
              onClick={handleTawarPopup}
            />
          )}
        </div>
      )}
    </div>
  );
  let description = (
    <div
      className="p-3"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <b>Deskripsi</b>
      <p className="mb-0 mt-2">{product.product_description}</p>
    </div>
  );
  return (
    <>
      <Head>
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout user={user}>
        <div className="max-width container-fluid p-0">
          {screen.md ? (
            <ProdukDesktopLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
              isOwner={isOwner}
            />
          ) : (
            <ProdukMobileLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
              isOwner={isOwner}
            />
          )}
        </div>
        {tawarPopup && (
          <TawarPopUp
            token={token}
            handletawar={handleTawarPopup}
            product_name={product.product_name}
            product_image={product.product_image}
            product_id={product.id}
            product_price={product.product_price}
            user={user}
          />
        )}
      </MainLayout>
    </>
  );
}

export default Produk;
