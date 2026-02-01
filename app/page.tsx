"use client"

import { useEffect, useRef } from "react"

export default function ChocoloopPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let x = 100
    let y = 100
    let dx = 3
    let dy = 2

    const sandwichWidth = 120
    const sandwichHeight = 60

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const drawSandwich = (posX: number, posY: number) => {
      // Pan superior
      ctx.fillStyle = "#D4A574"
      ctx.beginPath()
      ctx.ellipse(posX + sandwichWidth / 2, posY + 10, sandwichWidth / 2, 15, 0, Math.PI, 0)
      ctx.fill()
      ctx.fillRect(posX, posY + 10, sandwichWidth, 8)

      // Chocolate
      ctx.fillStyle = "#4A3728"
      ctx.fillRect(posX + 5, posY + 18, sandwichWidth - 10, 20)
      
      // Goteo de chocolate
      ctx.beginPath()
      ctx.ellipse(posX + 20, posY + 42, 6, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(posX + sandwichWidth - 25, posY + 40, 5, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Pan inferior
      ctx.fillStyle = "#C9956C"
      ctx.fillRect(posX, posY + 38, sandwichWidth, 12)
      ctx.beginPath()
      ctx.ellipse(posX + sandwichWidth / 2, posY + 50, sandwichWidth / 2, 10, 0, 0, Math.PI)
      ctx.fill()
    }

    const animate = () => {
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawSandwich(x, y)

      x += dx
      y += dy

      if (x + sandwichWidth > canvas.width || x < 0) {
        dx = -dx
      }
      if (y + sandwichHeight > canvas.height || y < 0) {
        dy = -dy
      }

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#D4A574]">
      {/* Header */}
      <header className="border-b border-[#2a1f1a] py-6">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            <span className="text-sm tracking-[0.3em] uppercase">Transmitiendo desde 2024</span>
            <span className="text-sm tracking-[0.3em] uppercase">24/7</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-7xl md:text-9xl font-light tracking-tight mb-6">
            Chocoloop
          </h1>
          <p className="text-xl md:text-2xl font-light text-[#8B7355] max-w-2xl mx-auto mb-4">
            Una experiencia visual continua de relevancia incuestionable.
          </p>
          <p className="text-sm text-[#5a4a3a] tracking-wide">
            Canal experimental de televisión
          </p>
        </section>

        {/* Video Player */}
        <section className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="border border-[#2a1f1a] bg-[#0a0a0a] aspect-video relative overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-xs tracking-widest uppercase text-[#5a4a3a]">En vivo</span>
              </div>
            </div>
            <p className="text-center text-sm text-[#5a4a3a] mt-4">
              Se recomienda dejar esto de fondo.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-[#2a1f1a] py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light mb-12 text-center">Sobre la transmisión</h2>
              <div className="grid md:grid-cols-2 gap-12 text-[#8B7355]">
                <div>
                  <h3 className="text-[#D4A574] text-lg mb-4">El concepto</h3>
                  <p className="leading-relaxed">
                    Un sándwich de chocolate rebotando perpetuamente sobre un fondo negro. 
                    Nada cambia. Ese es el punto.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#D4A574] text-lg mb-4">La misión</h3>
                  <p className="leading-relaxed">
                    Transmitiendo 24 horas al día, porque alguien tiene que hacerlo. 
                    Sí, este canal es absolutamente necesario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-[#2a1f1a] py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-light mb-2">24</p>
                <p className="text-sm text-[#5a4a3a] tracking-wide">Horas al día</p>
              </div>
              <div>
                <p className="text-4xl font-light mb-2">7</p>
                <p className="text-sm text-[#5a4a3a] tracking-wide">Días a la semana</p>
              </div>
              <div>
                <p className="text-4xl font-light mb-2">1</p>
                <p className="text-sm text-[#5a4a3a] tracking-wide">Imagen</p>
              </div>
              <div>
                <p className="text-4xl font-light mb-2">&infin;</p>
                <p className="text-sm text-[#5a4a3a] tracking-wide">Rebotes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="border-t border-[#2a1f1a] py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
                &ldquo;En un mundo de contenido efímero, ofrecemos lo único verdaderamente eterno: 
                un sándwich de chocolate en movimiento.&rdquo;
              </blockquote>
              <p className="text-sm text-[#5a4a3a] tracking-widest uppercase">
                Departamento de Filosofía Visual, Chocoloop
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-[#2a1f1a] py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light mb-12 text-center">Preguntas frecuentes</h2>
              <div className="space-y-8 text-[#8B7355]">
                <div className="border-b border-[#2a1f1a] pb-8">
                  <h3 className="text-[#D4A574] text-lg mb-3">¿Por qué existe este canal?</h3>
                  <p className="leading-relaxed">
                    Porque alguien tenía que hacerlo. La pregunta correcta es: ¿por qué no existía antes?
                  </p>
                </div>
                <div className="border-b border-[#2a1f1a] pb-8">
                  <h3 className="text-[#D4A574] text-lg mb-3">¿El sándwich alguna vez deja de rebotar?</h3>
                  <p className="leading-relaxed">
                    No. La transmisión es continua e ininterrumpida. Esto no es negociable.
                  </p>
                </div>
                <div className="border-b border-[#2a1f1a] pb-8">
                  <h3 className="text-[#D4A574] text-lg mb-3">¿Puedo contribuir al proyecto?</h3>
                  <p className="leading-relaxed">
                    Su contribución más valiosa es simplemente observar. Eso es suficiente. Eso es todo.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#D4A574] text-lg mb-3">¿Esto es arte?</h3>
                  <p className="leading-relaxed">
                    Esa determinación queda a discreción del espectador. Nosotros solo transmitimos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a1f1a] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#5a4a3a]">
            <p className="tracking-wide">Chocoloop Television Network</p>
            <p className="tracking-wide">Una experiencia de relevancia cultural absoluta</p>
            <p className="tracking-wide">Transmitiendo indefinidamente</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
