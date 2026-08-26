'use client'

import { useEffect, useState } from 'react'
import { Home, Dumbbell, Utensils, ChartLine } from 'lucide-react'

function Card({
  emoji,
  valor,
  texto,
}: {
  emoji: string
  valor: string
  texto: string
}) {
  return (
    <div className="bg-[#111c33] rounded-2xl p-4">
      <div className="text-3xl">{emoji}</div>
      <h3 className="text-2xl font-bold mt-3">{valor}</h3>
      <p className="text-gray-400 text-sm">{texto}</p>
    </div>
  )
}

export default function HomePage() {
  const META = 76

  const [peso, setPeso] = useState(81.45)

  const [input, setInput] = useState('')
  const [aba, setAba] = useState('home')
  const [tempo, setTempo] = useState(90)
  const [rodando, setRodando] = useState(false)
const [concluidos, setConcluidos] = useState<boolean[]>(() => {
  if (typeof window === "undefined") return [false, false, false, false, false]
  const salvo = localStorage.getItem("treino_seg")
  return salvo ? JSON.parse(salvo) : [false, false, false, false, false]
})
  const progresso = ((81.45 - peso) / (81.45 - META)) * 100
useEffect(() => {
  const salvo = localStorage.getItem("peso")
  if (salvo) setPeso(Number(salvo))
}, [])
  useEffect(() => {
  localStorage.setItem("peso", peso.toString())
}, [peso])

useEffect(() => {
  localStorage.setItem("treino_seg", JSON.stringify(concluidos))
}, [concluidos])

function atualizarPeso() {
  const valor = Number(input.replace(",", "."))

  if (!valor) return

  setPeso(valor)
  setInput("")
}
function iniciarTimer(segundos: number) {
  setTempo(segundos)
  setRodando(true)

  let t = segundos

  const timer = setInterval(() => {
    t--
    setTempo(t)

    if (t <= 0) {
      clearInterval(timer)
      setRodando(false)

      if (navigator.vibrate) {
        navigator.vibrate(400)
      }
    }
  }, 1000)
}

  return (
    <main className="min-h-screen bg-[#081224] text-white">
      <div className="max-w-md mx-auto p-5 pb-24">
        {aba === 'home' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-4xl font-bold">💪 Shape 76</h1>
              <p className="text-gray-400">Projeto de Cutting</p>
            </div>

            <div className="bg-[#111c33] rounded-[28px] p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Peso</p>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-5xl font-bold">
                      {peso.toFixed(2)}
                    </span>
                    <span className="text-2xl mb-1">kg</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 text-sm">Meta</p>
                  <h2 className="text-3xl font-bold">{META}kg</h2>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, progresso))}%`,
                    }}
                  />
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  {progresso.toFixed(0)}% da meta concluída
                </p>
              </div>

              <div className="flex gap-2 mt-5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Novo peso"
                  className="flex-1 bg-[#1a2845] rounded-xl px-4 py-3 outline-none"
                />

                <button
onClick={() => {
  const valor = Number(input.replace(",", "."))
  if (!valor) return
  setPeso(valor)
  setInput("")
}}                  className="bg-blue-500 px-5 rounded-xl font-semibold"
                >
                  Salvar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card emoji="🔥" valor="2200" texto="Calorias" />
              <Card emoji="🥩" valor="180g" texto="Proteína" />
              <Card emoji="💧" valor="3L" texto="Água" />
              <Card emoji="🏃" valor="25min" texto="Cardio" />
            </div>
          </div>
        )}

        {aba === 'treino' && (
  <div className="space-y-4">
    <div>
      <h1 className="text-3xl font-bold">🏋️ Segunda</h1>
      <p className="text-gray-400">Peito + Tríceps + Abdômen</p>
    </div>

    <div className="bg-[#111c33] rounded-3xl p-5 space-y-4">
      {[
        ["Supino reto", "4x8", "90s"],
        ["Supino inclinado", "3x10", "90s"],
        ["Crucifixo máquina", "3x12", "60s"],
        ["Tríceps corda", "3x12", "60s"],
        ["Abdominal polia", "3x15", "45s"],
].map(([nome, serie, descanso], index) => (        <div key={nome} className="bg-[#182541] rounded-2xl p-4">
  <div className="flex justify-between items-start">
  <div>
    <h3 className="font-semibold text-lg">{nome}</h3>
    <p className="text-sm text-gray-400">
      {serie} • Descanso {descanso}
    </p>
  </div>

  <input
    type="checkbox"
    checked={concluidos[index]}
    onChange={() => {
      const novo = [...concluidos]
      novo[index] = !novo[index]
      setConcluidos(novo)
    }}
    className="w-5 h-5"
  />
</div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <input
              placeholder="Carga (kg)"
              className="bg-[#223354] rounded-lg px-3 py-2 outline-none"
            />

            <input
              placeholder="Reps"
              className="bg-[#223354] rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </div>
      ))}

      <button className="w-full bg-green-500 py-3 rounded-xl font-bold">
        Concluir treino
      </button>
    </div>

    <div className="bg-[#111c33] rounded-3xl p-5">
      <p className="text-gray-400 text-sm">Tempo de descanso</p>

<h2 className="text-5xl font-bold mt-2">
  {String(Math.floor(tempo / 60)).padStart(2, "0")}:
  {String(tempo % 60).padStart(2, "0")}
</h2>
      <div className="grid grid-cols-2 gap-3 mt-4">
  <button
    onClick={() => iniciarTimer(60)}
    className="bg-blue-500 py-3 rounded-xl font-semibold"
  >
    60s
  </button>

  <button
    onClick={() => iniciarTimer(90)}
    className="bg-[#223354] py-3 rounded-xl font-semibold"
  >
    90s
  </button>
</div>

{rodando && (
  <p className="text-green-400 text-center mt-3">
    Cronômetro em andamento...
  </p>
)}
    </div>
  </div>
)}

        {aba === 'dieta' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">🍗 Dieta</h1>

            <div className="bg-[#111c33] rounded-3xl p-5 space-y-3">
              <label className="flex gap-3">
                <input type="checkbox" />
                Café da manhã
              </label>
              <label className="flex gap-3">
                <input type="checkbox" />
                Almoço
              </label>
              <label className="flex gap-3">
                <input type="checkbox" />
                Pós treino
              </label>
              <label className="flex gap-3">
                <input type="checkbox" />
                Jantar
              </label>
            </div>
          </div>
        )}

        {aba === 'evolucao' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">📈 Evolução</h1>

            <div className="bg-[#111c33] rounded-3xl p-5">
              <p className="text-gray-400">
                Gráfico e fotos entrarão na próxima etapa.
              </p>
            </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0b1628] border-t border-slate-800">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button
            onClick={() => setAba('home')}
            className={aba === 'home' ? 'text-blue-400' : 'text-gray-500'}
          >
            <Home size={24} />
          </button>

          <button
            onClick={() => setAba('treino')}
            className={aba === 'treino' ? 'text-blue-400' : 'text-gray-500'}
          >
            <Dumbbell size={24} />
          </button>

          <button
            onClick={() => setAba('dieta')}
            className={aba === 'dieta' ? 'text-blue-400' : 'text-gray-500'}
          >
            <Utensils size={24} />
          </button>

          <button
            onClick={() => setAba('evolucao')}
            className={aba === 'evolucao' ? 'text-blue-400' : 'text-gray-500'}
          >
            <ChartLine size={24} />
          </button>
        </div>
      </nav>
    </main>
  )
}
