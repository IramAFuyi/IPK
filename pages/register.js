import { useState } from "react";
import axios from "axios";
import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

function Register() {
  const [ registerMail, setRegisterMail ] = useState('');
  const [ registerPassword, setRegisterPassword ] = useState('');
  const [ registerBirthday, setRegisterBirthday ] = useState('');
  const [show, setShow] = useState({ password: false, cpassword: false })

  const register = () => {
    axios({
      method: 'post',
      data: {
        mail: registerMail,
        password_: registerPassword,
        birthdate: registerBirthday
      },
      withCredentials: true,
      url: 'http://localhost:3001/register'
    }).then((res) => console.log(res)).catch((err) => console.log(err))
  }
  return (
    <Layout>


        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Crea una cuenta</h1>
                <p className='w-3/4 mx-auto text-gray-400'></p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5'>
                <div className={styles.input_group}>
                  <input type="date"  name="birthday" placeholder="Fecha de nacimiento" onChange={e => setRegisterBirthday(e.target.value)} className={styles.input_text} />
                    
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                
                <div className={styles.input_group}>
                  <input type="text" name="mail" placeholder="Correo electrónico" onChange={e => setRegisterMail(e.target.value )} 
                  className={styles.input_text}/>
          
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>

                <div className={styles.input_group}>
          <input type={`${show.password ? "text" : "password"}`} name="password_" placeholder="Contraseña" onChange={e => setRegisterPassword(e.target.value)} className={styles.input_text}/>
                    
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
          <button onClick={register} className={styles.button}>Registrate</button>

                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Ya tienes una cuenta? <Link legacyBehavior href={'/login'}><a className='text-blue-700'>Inicia sesión</a></Link>
            </p>
        </section>
        </Layout>


  
      
  );
}

export default Register;
