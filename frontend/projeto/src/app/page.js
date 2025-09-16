"use client"
import Head from "next/head";
import {logoutUser, getUserInfo, refreshToken} from "../../utils/auth";
import {useState, useEffect} from "react";
 
export default function Home() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      const userDetails = await getUserInfo()
      if (userDetails) {
        setUser(userDetails)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await logoutUser();

  }


const handleRefresh = async () => {
  await refreshToken();
}

  return (
    
   
    <main className="min-h-screen bg-gray-100 items-center flex flex-col justify-center">
      
      <div className="bg-gray-600 p-8 flex flex-col rounded-lg">
      {user ? <h1>Olá, {user.username}</h1>: <h1>Boas vindas ao Zoombi!</h1>}
      <button onClick={handleLogout}> Sair </button>
      <button onClick={handleRefresh}> Refresh </button>
      </div>

    </main>
  );
}
