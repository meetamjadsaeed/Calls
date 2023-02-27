import React from 'react'
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Card } from 'antd';
import { Button, Popover, Space } from 'antd';
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);



import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';
import styles from "@/assets/css/Home.module.css";




const access_token = "";

const Call = () => {
  const [getCall, setCall] = useState();
  const router = useRouter();
  const { pid } = router.query;


  const fetchData = async () => {
    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}todos/${pid}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((result) => setCall(result.data))
      //   .then((result) => console.log(result.data))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
    fetchData();
  });
  return (
    <>
      <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
    </>

  )
}

export default Call