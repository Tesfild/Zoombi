"use client"
import React, { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { logoutUser, getUserInfo, refreshToken } from "../../utils/auth"

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
    await logoutUser()
    setUser(null)
  }

  const handleRefresh = async () => {
    await refreshToken()
  }

  return (
    <>


      <div className="min-h-screen bg-[#20053c] relative overflow-hidden">

        {/* Blob/Onda no topo */}
        <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
          <svg
            className="relative block w-full h-48"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
          >
            <path
              fill="#eca390"
              fillOpacity="1"
              d="M1440,80 C1300,60 1200,40 1000,50 C800,60 600,80 400,70 C200,60 100,40 0,30 L0,0 L1440,0 Z"
            />
          </svg>
        </div>

        {/* Blob/Onda na parte inferior */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            className="relative block w-full h-64"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
          >
            <path
              fill="#eca390"
              fillOpacity="1"
              d="M0,250 C200,200 400,150 600,170 C800,190 1000,230 1200,210 C1300,200 1400,190 1440,180 L1440,400 L0,400 Z"
            />
          </svg>
        </div>


        {/* Header/Navigation */}
        <header className="relative z-10 px-6 py-12">
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-white">
              Zoombi
            </div>



            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white/80">
                  Olá, <span className="text-[#eca390] font-semibold">{user.username}</span>
                </span>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 text-white/80 hover:text-white border border-white/30 rounded-lg transition-all duration-200 hover:border-white/60"
                >
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/login">
                  <button className="px-6 py-2 text-white hover:text-[#eca390] transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link href="/cadastro">
                  <button className="px-6 py-2 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]">
                    Cadastre-se
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Título Principal */}
            {user ? (
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Bem-vindo(a) de volta,
                  <span className="block text-[#eca390]">
                    {user.username}!
                  </span>
                </h1>
                <p className="text-xl text-white/80">
                  Pronto para dominar a vida acadêmica, Zoombi? Vamos nessa!
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Bom te ter no
                  <span className="block text-[#eca390]">
                    Zoombi.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
                  A plataforma que tira você do modo zumbi acadêmico!
                  <br className="hidden md:block" />
                  Organize sua vida estudantil antes que ela vire um apocalipse de trabalhos atrasados.
                </p>
              </div>
            )}

            {/* Botões de Call-to-Action */}
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.05] shadow-lg text-lg">
                  EXPLORAR AGORA
                </button>
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-[#eca390] text-[#eca390] hover:bg-[#eca390] hover:text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.05] text-lg">
                  MEU PERFIL
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/cadastro">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.05] shadow-lg text-lg">
                    COMEÇAR AGORA
                  </button>
                </Link>
                <Link href="/login">
                  <button className="w-full sm:w-auto px-8 py-4 border-2 border-[#eca390] text-[#eca390] hover:bg-[#eca390] hover:text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.05] text-lg">
                    JÁ TENHO CONTA
                  </button>
                </Link>
              </div>
            )}

            {/* Features/Benefícios */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#eca390] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#20053c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pare de Zumbificar</h3>
                <p className="text-white/70">
                  Organize trabalhos, provas e prazos. Porque andar pela universidade sem rumo é coisa de zumbi mesmo.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#eca390] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#20053c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ressuscite suas Notas</h3>
                <p className="text-white/70">
                  Monitore faltas, controle frequência e não deixe sua média apodrecer. Seus professores agradecem!
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#eca390] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#20053c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Céééérebros Funcionando</h3>
                <p className="text-white/70">
                  Faça anotações inteligentes e tenha ideias brilhantes. Transforme seu estado zumbi em modo Zoombi!
                </p>
              </div>
            </div>


          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 mt-16">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#20053c] text-sm">
              © 2025 Zoombi. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}