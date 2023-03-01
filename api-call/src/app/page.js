"use client";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Avatar, Button, Card, Text, Textarea } from '@nextui-org/react'
import { ArrowUpSquare, Login } from 'react-iconly';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [Query, setQuery] = useState("")
  const [chatLog, setchatLog] = useState([
  ])
  useEffect(() => {
    console.log(chatLog, "LSLSLSLSLSLSL");
  }, [chatLog])
  const apiCall = async (val) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      message: val
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("http://localhost:8080", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("LSLSLSLLSLS", result, result.data);
        // setchatLog([...chatLog, { user: "GPT", message: `${result.data}` }])
        setchatLog(prevValues => [...prevValues, { user: "GPT", message: `${result.data}` }])
      })
      .catch(error => console.log('error', error));
  }
  const handleClick = (e) => {
    e.preventDefault();
    // setchatLog([...chatLog, { user: "Me", message: Query }])
    setchatLog(prevValues => [...prevValues, { user: "Me", message: Query }])
    apiCall(Query)
    setQuery("")

  }
  return (
    <div className={styles.bodySection}>
      <div className={styles.asideDiv}>
        <aside>NEW THREAD</aside>
        <div className={styles.asideBottom}>
          <div className={styles.asideOtherOption}> <Login set="bold" primaryColor="white" /><div className={styles.otherOptionText}>Light Mode</div></div>
          <div className={styles.asideOtherOption}> <Login set="bold" primaryColor="white" /><div className={styles.otherOptionText}>OpenAI Discord</div></div>
          <div className={styles.asideOtherOption}> <Login set="bold" primaryColor="white" /><div className={styles.otherOptionText}>Updates & FAQ</div></div>
          <div className={styles.asideOtherOption}> <Login set="bold" primaryColor="white" /><div className={styles.otherOptionText}>Log out</div></div>
        </div>
      </div>
      <div className={styles.mainDiv}>
        <div className={styles.bodyDiv}>
          {chatLog.length > 0 ?

            <section style={{ position: "absolute", bottom: 0 }}>
              {chatLog?.map(({ user, message }) =>
                <div className={styles.queryBox}>
                  <Avatar
                    squared
                    text={user} />
                  <p style={{ marginLeft: 20, marginTop: 13 }}>
                    <TypeAnimation
                      sequence={[
                        `${message}.`, // Types 'One'
                        1000,
                         // Waits 1s
                      ]}
                      wrapper="div"
                      cursor={true}
                      repeat={Infinity}
                      style={{ fontSize: '1em' }}
                    />
                  </p>
                </div>)}
            </section>

            :
            <>
              <section style={{ marginBottom: 20 }}><h1>ChatGPT</h1></section>
              <section className={styles.flexCon}>
                <div className={styles.cardBox}>
                  <Card css={{ mw: "400px", backgroundColor: '#8B898E' }}>
                    <Card.Body>
                      <Text css={{ color: "#ffff" }}>It might be possible see about circling the wagons with the MUI and Vercel teams, as well, on this.</Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className={styles.cardBox}>
                  <Card css={{ mw: "400px", backgroundColor: '#8B898E' }}>
                    <Card.Body>
                      <Text css={{ color: "#ffff" }}>It might be possible see about circling the wagons with the MUI and Vercel teams, as well, on this.</Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className={styles.cardBox}>
                  <Card css={{ mw: "400px", backgroundColor: '#8B898E' }}>
                    <Card.Body>
                      <Text css={{ color: "#ffff" }}>It might be possible see about circling the wagons with the MUI and Vercel teams, as well, on this.</Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className={styles.cardBox}>
                  <Card css={{ mw: "400px", backgroundColor: '#8B898E' }}>
                    <Card.Body>
                      <Text css={{ color: "#ffff" }}>It might be possible see about circling the wagons with the MUI and Vercel teams, as well, on this.</Text>
                    </Card.Body>
                  </Card>
                </div>


              </section>
            </>
          }

        </div>
        <div className={styles.mainBottom}>
          <Textarea
            className='textArea'
            width='70%'
            color='white'
            value={Query}
            onChange={(e) => { setQuery(e.target.value); }}
            // label="Write your thoughts"
            placeholder="Enter your amazing ideas."
          />
          <ArrowUpSquare onClick={handleClick} set="bold" style={{ width: 50, height: 50 }} primaryColor="#D1D3D4" />
        </div>
      </div>
    </div>
  )
}
