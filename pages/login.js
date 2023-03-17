import { useState } from 'react'
import axios from "axios";
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
    
    const [show, setShow] = useState(false)
    
    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "http://localhost:3000"})
    }

    const [loginMail, setLoginMail] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const login = () => {
        axios({
            method: 'post',
            data: {
                username: loginMail,
                password: loginPassword
                },
            withCredentials: true,
            url: 'http://localhost:3001/login'
            }).then(res => {console.log(res)}).catch(err => {console.log(err)})
    }



    return (
        <Layout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Inicio de sesión</h1>
                <p className='w-3/4 mx-auto text-gray-400'></p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5'>
                <div className={styles.input_group}>
                <input type="text" name="username" placeholder="Correo electrónico" onChange={e => setLoginMail(e.target.value )} className={styles.input_text}/>
                <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                <div className={styles.input_group}>
                <input type="password" name="password" placeholder="Contraseña" onChange={e => setLoginPassword(e.target.value )} className={styles.input_text}/>
                <span className='icon flex items-center px-4'>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                <button onClick={login} className={styles.button}>Entrar</button>
                    
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                        Inicia sesión con Google <Image src={'/assets/google.svg'} width="20" height={20} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                        Inicia sesión con Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                No tienes una cuenta todavía? <Link legacyBehavior href={'/register'}><a className='text-blue-700'>Crea una</a></Link>
            </p>
        </section>

        </Layout>
                
        
    )
}
