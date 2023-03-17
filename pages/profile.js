import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from "../components/NavBar";
import styles from '../styles/Home.module.css'
import axios  from 'axios'
import { useState, useEffect } from 'react'



export default function Home() {

const [mail, setMail] = useState('');

useEffect(() => {
  getUser();
}, []);

const getUser  = () => {
  axios({
    method: 'get',
    withCredentials: true,
    url: 'http://localhost:3001/getUser'
  }).then(res => {setMail(res.data.mail)}).catch(err => {console.log(err)})
}

  return (
    <div>
      <div className={styles.container}>
        <NavBar></NavBar>
      <h1>
      Logged in : {mail}
      </h1>
    </div>  
    </div>
  )
}
