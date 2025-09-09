"use client"
import {useState} from "react"
import React from 'react'

export default function RegisterPage() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="min-h-screen bg-gray-100 items-center flex flex-col justify-center">

            <form>

                <label>Nome de usuário</label>
                <input type="text" value={userName} required onChange={(e)=>{setUserName(e.target.value)}}/>
                <br/>

                <label>E-mail</label>
                <input type="text" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                <br/>

                <label>Senha</label>
                <input type="text" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>

                <button type="submit">Cadastrar</button>
            </form>

        </div>
    )
}