import React from 'react'
import { Button, Space } from 'antd';
import styles from "@/assets/css/Home.module.css";
import Image from 'next/image'
import { useState, useEffect } from "react";
import Link from 'next/link';



function Header() {
  const [user, setUser] = useState();


  useEffect(() => {
    const loggedInUser = localStorage.getItem("userToken");
    // console.log(localStorage.getItem("token"));

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // console.log(foundUser);
      setUser(foundUser);
    } else {
      console.log("User Not Found");
    }
  }, []);

  return (
    <>
      <div className={styles.header}>
        <a href="#default" className={styles.logo}>
          <Image
            // loader={myLoader}
            src="/TT Logo.png"
            alt="Logo"
            width={630}
            height={74}
          />

        </a>
        <div className={styles.headerRight}>

          {user && user.user ?
            <a className={styles.active} href="#home">

              {user && user.user ? user.user.username : "Login Please"}
            </a>
            :
            <Link legacyBehavior={true} href={"/login"}>
              <a className={styles.active}>


                Login



              </a>
            </Link>
          }


        </div>
      </div>
    </>
  )
}

export default Header