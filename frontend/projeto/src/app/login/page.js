"use client"
import React, { useState, useEffect } from "react"
import { loginUser } from "../../../utils/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    // Verifica se já está autenticado
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/usuarios/profile/", {
            withCredentials: true,
        })
            .then(() => {
                // Se conseguiu pegar o perfil já está autenticado
                router.replace("/profile")
            })
            .catch(() => {
                // Se deu erro continua na tela de login
            })
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === "" || email === "") return
        try {
            await loginUser(email, password)
            alert("Login realizado com sucesso!")
            router.push("/profile") // vai direto para o perfil depois do login
        } catch (e) {
            alert("Login não pode ser realizado.")
        }
    }

    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">
            {/* --- ondas do topo --- */}
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M1440,120 C1300,80 1200,40 1000,60 C800,80 600,120 400,100 C200,80 100,40 0,20 L0,0 L1440,0 Z" />
                </svg>
            </div>

            {/* --- ondas inferiores --- */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-135" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M0,200 C200,150 400,100 600,120 C800,140 1000,180 1200,160 C1300,150 1400,140 1440,130 L1440,600 L0,600 Z" />
                </svg>
            </div>

            {/* --- conteúdo principal --- */}
            <div className="relative z-10 w-full max-w-md px-4">
                <div className="text-left mb-20">
                    <h1 className="text-6xl font-bold text-white mb-3">Boas-vindas, Zoombi.</h1>
                    <h6 className="text-white text-lg">Como é bom te ver novamente!</h6>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input de email */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-5 bg-white/90 backdrop-blur-sm rounded-3xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-1000 focus:outline-none transition-all duration-200"
                            placeholder="E-mail"
                            required
                        />
                    </div>

                    {/* Input de senha */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-5 bg-white/90 backdrop-blur-sm rounded-3xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-1000 focus:outline-none transition-all duration-200"
                            placeholder="Senha"
                            required
                        />
                    </div>

                    {/* Botão entrar */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#b8a6d9] focus:ring-offset-2 focus:ring-offset-[#eca390] shadow-lg"
                    >
                        ENTRAR
                    </button>

                    {/* Link para cadastro */}
                    <p className="text-center text-white-100 text-sm">
                        Ainda não é um Zoombi?{" "}
                        <Link href={"/cadastro"}>
                            <button type="button" className="text-[#eca390] font-semibold hover:underline">
                                CADASTRE-SE
                            </button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
