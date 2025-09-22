"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

// Componente Loading
function LoadingComponent() {
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M1440,60 C1300,40 1200,30 1000,35 C800,40 600,50 400,45 C200,40 100,30 0,25 L0,0 L1440,0 Z" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M0,150 C200,120 400,100 600,110 C800,120 1000,140 1200,130 C1300,125 1400,120 1440,115 L1440,250 L0,250 Z" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-semibold text-white mb-6">Céééérebross...</h1>
                <div className="relative">
                    <div className="animate-spin h-12 w-12 rounded-full border-4 border-[#eca390] border-t-transparent"></div>
                    <div className="absolute inset-1 animate-spin h-10 w-10 rounded-full border-4 border-white/30 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <h6 className="mt-6 text-white/70 text-sm">🧟‍♂️ Aguarde enquanto ressuscitamos seus dados...</h6>
            </div>
        </div>
    )
}

// Componente Not Found
function NotFoundComponent({ router }) {
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M1440,60 C1300,40 1200,30 1000,35 C800,40 600,50 400,45 C200,40 100,30 0,25 L0,0 L1440,0 Z" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M0,150 C200,120 400,100 600,110 C800,120 1000,140 1200,130 C1300,125 1400,120 1440,115 L1440,250 L0,250 Z" />
                </svg>
            </div>

            <div className="relative z-10 text-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold text-white mb-3">Perfil não encontrado.</h1>
                <p className="text-lg text-white/80 mb-8">
                    Parece que esse Zoombi se perdeu da horda
                    <br />
                    ...ou não é um Zoombi? 🧟‍♂️
                </p>
                <button
                    onClick={() => router.push("/login")}
                    className="px-8 py-3 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                    Voltar para Login
                </button>
            </div>
        </div>
    )
}

export default function ProfileForm() {
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [userStats, setUserStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        totalHours: 0,
        completedHours: 0,
        frequency: 0,
        totalFrequency: 0,
        overallScore: 0
    })

    const router = useRouter()

    // Buscar dados do perfil e estatísticas
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Buscar perfil do usuário
                const profileResponse = await axios.get("http://127.0.0.1:8000/api/usuarios/profile/", {
                    withCredentials: true,
                })

                setProfile(profileResponse.data)
                setFirstName(profileResponse.data.first_name || "")
                setLastName(profileResponse.data.last_name || "")

                // Buscar estatísticas do usuário (substitua pelos endpoints corretos da sua API)
                try {
                    const statsResponse = await axios.get("http://127.0.0.1:8000/api/usuarios/stats/", {
                        withCredentials: true,
                    })

                    // Calcular estatísticas baseadas nos dados reais
                    const stats = statsResponse.data
                    const calculatedStats = {
                        totalTasks: stats.total_tasks || 0,
                        completedTasks: stats.completed_tasks || 0,
                        totalHours: stats.total_hours || 0,
                        completedHours: stats.completed_hours || 0,
                        frequency: stats.days_active || 0,
                        totalFrequency: stats.total_days || 30, // Exemplo: últimos 30 dias
                        overallScore: calculateOverallScore(stats)
                    }

                    setUserStats(calculatedStats)
                } catch (statsError) {
                    // Se não conseguir buscar stats, usar valores padrão
                    console.warn("Não foi possível carregar estatísticas:", statsError)
                    setUserStats({
                        totalTasks: 10,
                        completedTasks: 8,
                        totalHours: 100,
                        completedHours: 75,
                        frequency: 20,
                        totalFrequency: 30,
                        overallScore: 75
                    })
                }

            } catch (profileError) {
                console.error("Erro ao carregar perfil:", profileError)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchProfileData()
    }, [])

    // Função para calcular pontuação geral
    const calculateOverallScore = (stats) => {
        if (!stats) return 0

        const taskScore = stats.total_tasks > 0 ? (stats.completed_tasks / stats.total_tasks) * 100 : 0
        const hourScore = stats.total_hours > 0 ? (stats.completed_hours / stats.total_hours) * 100 : 0
        const frequencyScore = stats.total_days > 0 ? (stats.days_active / stats.total_days) * 100 : 0

        return Math.round((taskScore + hourScore + frequencyScore) / 3)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        if (avatar instanceof File) formData.append("avatar", avatar);

        try {
            await axios.put(
                "http://127.0.0.1:8000/api/usuarios/profile/",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            // Atualiza os dados no estado
            const updatedProfile = await axios.get(
                "http://127.0.0.1:8000/api/usuarios/profile/",
                { withCredentials: true }
            );

            setProfile(updatedProfile.data);
            setIsEditing(false);
            alert("Perfil atualizado com sucesso!");
        } catch (err) {
            console.error("Erro ao atualizar perfil:", err);
            alert("Não foi possível atualizar. Tente novamente!");
        }
    };

    // Funções auxiliares para calcular porcentagens
    const getTaskProgress = () => (userStats.totalTasks > 0 ? Math.round((userStats.completedTasks / userStats.totalTasks) * 100) : 0);
    const getHourProgress = () => (userStats.totalHours > 0 ? Math.round((userStats.completedHours / userStats.totalHours) * 100) : 0);
    const getFrequencyProgress = () => (userStats.totalFrequency > 0 ? Math.round((userStats.frequency / userStats.totalFrequency) * 100) : 0);


    const getMotivationalMessage = (type, percentage) => {
        if (percentage >= 90) {
            switch (type) {
                case 'task': return "Excelente! Você está arrasando nos trabalhos! 🔥"
                case 'hour': return "Incrível! Suas horas de estudo estão perfeitas! ⚡"
                case 'frequency': return "Fantástico! Você é super frequente! 🌟"
                default: return "Perfeito!"
            }
        } else if (percentage >= 70) {
            switch (type) {
                case 'task': return "Muito bom! Continue assim nos trabalhos! 💪"
                case 'hour': return "Ótimo progresso nas horas de estudo! 📚"
                case 'frequency': return "Boa frequência! Mantenha o ritmo! 🎯"
                default: return "Muito bom!"
            }
        } else if (percentage >= 50) {
            switch (type) {
                case 'task': return "No caminho certo! Foque nos trabalhos pendentes! 📝"
                case 'hour': return "Você pode melhorar suas horas de estudo! ⏰"
                case 'frequency': return "Tente ser mais frequente! 📅"
                default: return "Continue se esforçando!"
            }
        } else {
            return "Hora de acordar esse Zoombi! Vamos lá! 🧟‍♂️"
        }
    }

    if (loading) return <LoadingComponent />
    if (error || !profile) return <NotFoundComponent router={router} />

    const fullName = firstName && lastName ? `${firstName} ${lastName}` : (profile.username || "Zoombi Anônimo")
    const userEmail = profile.email || "zoombi@exemplo.com"

    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M1440,60 C1300,40 1200,30 1000,35 C800,40 600,50 400,45 C200,40 100,30 0,25 L0,0 L1440,0 Z" />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-full h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250" preserveAspectRatio="none">
                    <path fill="#eca390" fillOpacity="1" d="M0,150 C200,120 400,100 600,110 C800,120 1000,140 1200,130 C1300,125 1400,120 1440,115 L1440,250 L0,250 Z" />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#eca390] rounded-full flex items-center justify-center">
                            <span className="text-[#20053c] text-lg font-bold">🧟</span>
                        </div>
                        <span className="text-2xl font-bold text-white">ZOOMBI</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-white/80">Olá, {firstName || "Zoombi"}! 👋</span>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="px-4 py-2 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] rounded-xl font-medium transition-all duration-200"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Coluna esquerda - Perfil principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Card do perfil */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#eca390]/20 to-[#eca390]/10 px-8 py-12">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        {profile.avatar ? (
                                            <img
                                                src={`http://127.0.0.1:8000${profile.avatar}`}
                                                alt="Avatar"
                                                className="w-32 h-32 rounded-full border-4 border-[#eca390] shadow-2xl object-cover"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full border-4 border-[#eca390] shadow-2xl bg-[#eca390]/20 flex items-center justify-center">
                                                <span className="text-6xl">🧟‍♂️</span>
                                            </div>
                                        )}
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#eca390] rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-lg">⚡</span>
                                        </div>
                                    </div>
                                    <h1 className="text-4xl font-bold text-white mb-2">{fullName}</h1>
                                    <div className="flex items-center space-x-2 text-[#eca390] mb-4">
                                        <span className="font-medium">{profile.username}</span>
                                        <span className="text-white/60">#{profile.user_id}</span>
                                    </div>
                                    <p className="text-white/80 text-lg">
                                        Membro da Horda Zoombi desde {new Date().getFullYear()} 🧠
                                    </p>
                                </div>
                            </div>

                            {/* Informações do usuário */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-white/60 mb-2">📧 E-mail</h3>
                                        <p className="text-lg text-white">{profile.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-white/60 mb-2">📅 Membro desde</h3>
                                        <p className="text-lg text-white">{new Date(profile.date_joined).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-white/60 mb-2">⚡ Status</h3>
                                        <span className="px-3 py-1 bg-[#eca390]/20 text-[#eca390] rounded-full text-sm font-medium">
                                            {profile.is_active ? "Zoombi Ativo" : "Zoombi Inativo"}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-white/60 mb-2">🎯 Pontuação Geral</h3>
                                        <p className="text-lg text-white">{userStats.overallScore}% de progresso</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/20">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="w-full py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 text-lg"
                                    >
                                        {isEditing ? "🚫 Cancelar Edição" : "✏️ Editar Perfil"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card de progresso detalhado */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
                            <h2 className="text-3xl font-bold text-white mb-8">📊 Progresso Zoombi</h2>
                            <div className="bg-gradient-to-r from-[#20053c] to-[#2d0749] rounded-2xl p-6 border border-[#eca390]/20">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Frequência */}
                                    <div className="text-center text-white">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-[#eca390]/20 rounded-2xl flex items-center justify-center border border-[#eca390]/30">
                                                <span className="text-3xl">📚</span>
                                            </div>
                                        </div>
                                        <div className="text-4xl font-bold mb-2 text-[#eca390]">
                                            {userStats.frequency}/{userStats.totalFrequency}
                                        </div>
                                        <div className="text-lg font-semibold mb-3">Frequência</div>
                                        <div className="text-xs text-white/70 leading-relaxed">
                                            {getMotivationalMessage('frequency', getFrequencyProgress())}
                                        </div>
                                        <div className="mt-3 text-sm font-medium text-[#eca390]">
                                            {getFrequencyProgress()}% concluído
                                        </div>
                                    </div>

                                    {/* Trabalhos */}
                                    <div className="text-center text-white">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-[#eca390]/20 rounded-2xl flex items-center justify-center border border-[#eca390]/30">
                                                <span className="text-3xl">📝</span>
                                            </div>
                                        </div>
                                        <div className="text-4xl font-bold mb-2 text-[#eca390]">
                                            {userStats.completedTasks}/{userStats.totalTasks}
                                        </div>
                                        <div className="text-lg font-semibold mb-3">Trabalhos</div>
                                        <div className="text-xs text-white/70 leading-relaxed">
                                            {getMotivationalMessage('task', getTaskProgress())}
                                        </div>
                                        <div className="mt-3 text-sm font-medium text-[#eca390]">
                                            {getTaskProgress()}% concluído
                                        </div>
                                    </div>

                                    {/* Horas de Estudo */}
                                    <div className="text-center text-white">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-[#eca390]/20 rounded-2xl flex items-center justify-center border border-[#eca390]/30">
                                                <span className="text-3xl">⏰</span>
                                            </div>
                                        </div>
                                        <div className="text-4xl font-bold mb-2 text-[#eca390]">
                                            {userStats.completedHours}/{userStats.totalHours}
                                        </div>
                                        <div className="text-lg font-semibold mb-3">Horas</div>
                                        <div className="text-xs text-white/70 leading-relaxed">
                                            {getMotivationalMessage('hour', getHourProgress())}
                                        </div>
                                        <div className="mt-3 text-sm font-medium text-[#eca390]">
                                            {getHourProgress()}% concluído
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna direita */}
                    <div className="space-y-6">
                        {/* Círculo de progresso geral */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-6">🎯 Progresso Geral</h3>
                                <div className="relative w-40 h-40 mx-auto mb-6">
                                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="transparent"
                                            className="text-white/20"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="transparent"
                                            strokeDasharray={`${(userStats.overallScore / 100) * 219.8} 219.8`}
                                            className="text-[#eca390] transition-all duration-1000"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-[#eca390]">{userStats.overallScore}</div>
                                            <div className="text-sm text-white/70">pontos</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/80 text-sm">
                                    {userStats.overallScore >= 80 ? "🔥 Zoombi Exemplar!" :
                                        userStats.overallScore >= 60 ? "💪 Zoombi Dedicado!" :
                                            userStats.overallScore >= 40 ? "📈 Zoombi em Evolução!" :
                                                "🧟‍♂️ Hora de Acordar!"}
                                </p>
                            </div>
                        </div>

                        {/* Formulário de edição */}
                        {isEditing && (
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6">
                                <h3 className="text-2xl font-bold text-white mb-6">✏️ Editar Perfil</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Nome</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                            placeholder="Seu nome"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Sobrenome</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                            placeholder="Seu sobrenome"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Foto do Zoombi</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setAvatar(e.target.files[0])}
                                            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#eca390] file:text-[#20053c] file:font-semibold hover:file:bg-[#d78c86] focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-3">
                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]"
                                        >
                                            Salvar Alterações
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFirstName(profile.first_name || "")
                                                setLastName(profile.last_name || "")
                                                setAvatar(null)
                                                setIsEditing(false)
                                            }}
                                            className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl transition-all duration-200"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Dicas do Zoombi */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-white mb-4"> Dicas do Zoombi</h3>
                            <div className="space-y-3 text-sm text-white/80">
                                <div className="flex items-start space-x-2">
                                    <div className="text-[#eca390]">⚡</div>
                                    <div>Revise suas anotações diariamente — 15 minutos já ajudam muito.</div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="text-[#eca390]">📌</div>
                                    <div>Quebre tarefas grandes em pequenas metas: avance 25 minutos, pause 5.</div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="text-[#eca390]">🎧</div>
                                    <div>Testa músicas instrumentais ou ruído branco para foco.</div>
                                </div>
                            </div>
                        </div>
                    </div> {/* fim coluna direita */}

                </div> {/* fim grid */}
            </div> {/* fim conteúdo principal */}
        </div> /* fim root */
    )
}
