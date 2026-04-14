"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineChartBar, HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const formularioRef = useRef<HTMLDivElement | null>(null);
  const yaScrolleado = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const services = [
    {
      title: "Impuestos",
      description: "Liquidación y presentación de impuestos sin complicaciones.",
      image: "/impuestos.jpg",
      icon: HiOutlineChartBar,
      detail: "Nos encargamos de todos tus impuestos con asesoramiento personalizado.",

    },
    {
      title: "Trámites",
      description: "Simplificamos y gestionamos todos los trámites de tu negocio.",
      image: "/tramites.jpg",
      icon: HiOutlineDocumentText,
      detail: "Gestionamos tus trámites de forma ágil y segura, evitando demoras y complicaciones.",
    },
    {
      title: "Asesoría",
      description: "Asesoramiento contable y fiscal para tomar mejores decisiones.",
      image: "/asesoria.jpg",
      icon: HiOutlineUsers,
      detail: "Brindamos asesoramiento personalizado para ayudarte a tomar decisiones seguras y hacer crecer tu negocio.",
    },
  ];

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % services.length;
    });
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + services.length) % services.length;
    });
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  const mensaje = "Hola DUCA, quisiera recibir información sobre sus servicios";
  const whatsappUrl = `https://wa.me/59898635267?text=${encodeURIComponent(mensaje)}`;

  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setEstado("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setEstado("ok");
        setForm({ nombre: "", email: "", mensaje: "" });
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    } finally {
      setEnviando(false); // 🔥 mejor que hacerlo afuera
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const ThemeToggle = () => {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);

      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
      } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        setDark(false);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (prefersDark) {
          document.documentElement.classList.add("dark");
          setDark(true);
        }
      }
    }, []);

    const toggleTheme = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      setDark(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    useEffect(() => {
      console.log("mostrarFormulario:", mostrarFormulario);
      if (mostrarFormulario && !yaScrolleado.current) {
        formularioRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        yaScrolleado.current = true;
      }
    }, [mostrarFormulario]);

    if (!mounted) return null;

    return (
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:scale-110 transition"
      >
        {dark ? (
          <HiOutlineSun size={15} className="text-yellow-400" />
        ) : (
          <HiOutlineMoon size={15} className="text-primary" />
        )}
      </button>
    );
  };

  return (
    <main className="pt-24 min-h-screen bg-bg text-text overflow-visible relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-secondary/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
          }`}

      >{/* NAVBAR */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-3">
          {/* <Image src="/logo.png" alt="DUCA logo" width={40} height={40} />*/}
            <span className="font-semibold text-3xl leading-tight text-text">
              DUCA
            </span>
            <span className="text-sm text-gray-500 block">
              Estudio Contable e Impositivo.<br /><i>De Natalia Dutra Casero.</i>
            </span>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8 text-sm text-text">
            <a href="#inicio" className="hover:text-primary transition">Inicio</a>
            <a href="#servicios" className="hover:text-primary transition">Servicios</a>
            <a href="#nosotros" className="hover:text-primary transition">Nosotros</a>
            <a href="#contacto" className="hover:text-primary transition">Contacto</a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-text">
            {/* REDES SOCIALES */}
            {/* TIKTOK */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
            >
              <FaTiktok />
            </a>
            {/* INSTAGRAM */}
            <a
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
            >
              <FaInstagram />
            </a>
            {/* FACEBOOK */}
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
            >
              <FaFacebook />
            </a>
            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/eciduca/"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            {/* TOUTUBE */}
            <a
              href="https://www.youtube.com/@DucaECI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
            >
              <FaYoutube />
            </a>
            {/* THEME TOGGLE */}
            {/* <ThemeToggle />*/}
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-surface border-t border-border px-6 pb-6 flex flex-col gap-4 animate-fade-in">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative px-6 pt-24 pb-16 md:pt-24 md:pb-32 text-center">

        {/* CONTENIDO */}
        <div className="max-w-4xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-6xl font-bold leading-tight"
          >
            Contabilidad sin vueltas:
            <span className="block text-primary">simple, rápida y económica.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-lg text-muted max-w-2xl mx-auto"
          >
            En DUCA gestionamos tus impuestos, trámites y contabilidad para que te enfoques en hacer crecer tu negocio.
          </motion.p>

          {/* CTA */}
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#servicios"
              /*className="border border-border px-8 py-4 rounded-xl text-lg hover:bg-surface transition"*/
              className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition"
            >
              Ver servicios
            </a>
          </div>

          {/* SOCIAL PROOF */}
          <p className="mt-6 text-sm text-muted">
            Tu confianza, <span className="font-semibold text-text"> nuestra responsabilidad. <br /></span>
            Tu tranquilidad, <span className="font-semibold text-text"> nuestro compromiso.</span>
          </p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">

        {/* TITULO */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-semibold">
            Todo lo que tu empresa necesita
          </h2>
          <p className="mt-4 text-muted">
            Soluciones contables modernas, simples y a tu alcance.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="cursor-pointer group bg-surface border border-border p-8 rounded-2xl hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Icon
                  size={28}
                  className="text-primary mb-4 transition group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mb-2">
                  {service.title}
                </h3>

                <p className="text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {activeIndex !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full relative"
            >
              {/* Cerrar */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* 🔥 CONTENIDO DINÁMICO */}
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      mass: 0.8,
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -100) {
                        goNext(); // swipe izquierda
                      } else if (info.offset.x > 100) {
                        goPrev(); // swipe derecha
                      }
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      {services[activeIndex].title}
                    </h2>

                    <div className="w-full h-64 overflow-hidden rounded-xl mb-4">
                      <img
                        src={services[activeIndex].image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-gray-600">
                      {services[activeIndex].detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navegación */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={goPrev}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  ← Anterior
                </button>

                <button
                  onClick={goNext}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Siguiente →
                </button>

              </div>
              <div className="flex justify-center gap-2 mt-4">
                {services.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setDirection(i > activeIndex! ? 1 : -1);
                      setActiveIndex(i);
                    }}
                    className={`h-2 w-2 rounded-full cursor-pointer ${i === activeIndex ? "bg-black" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* NOSOTROS / HISTORIA */}
      <section
        id="nosotros"
        className="px-6 md:px-10 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* TEXTO */}
        <div>
          <h2 className="text-4xl font-semibold leading-tight">
            La historia detrás de DUCA
          </h2>

          <p className="mt-6 text-muted text-justify">
            DUCA nació con una idea clara: brindar soluciones contables y fiscales simples y eficaces
            para acompañar el crecimiento de las empresas.
          </p>

          <p className="mt-4 text-muted text-justify">
            Sabemos que los impuestos, trámites y la gestión contable pueden ser un
            dolor de cabeza. Por eso creamos un servicio moderno, claro y cercano,
            pensado para emprendedores y empresas que buscan orden, tranquilidad y
            control.
          </p>

          <p className="mt-4 text-muted text-justify">
            Hoy ayudamos a decenas de empresas a enfocarse en lo importante: hacer
            crecer su negocio, mientras nosotros nos ocupamos del resto.
          </p>
        </div>

        {/* VISUAL */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

          <div className="relative bg-surface border border-border rounded-3xl p-10 text-center shadow-lg">
            <p className="text-4xl font-bold text-primary">Seguinos y conocé más sobre DUCA.</p>


            <div className="mt-6 border-t border-border pt-6">
              <div className="flex items-center justify-center gap-2">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://www.linkedin.com/in/eciduca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@DucaECI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface hover:bg-primary hover:text-white transition"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*TESTIMOMIOS*/}
      <section className="px-6 md:px-10 py-12 max-w-6xl mx-auto text-center">

        {/*TITULO */}
        <h2 className="text-4xl font-semibold">
          Empresas que ya confían en DUCA
        </h2>

        <p className="mt-4 text-muted">
          Clientes que simplificaron su contabilidad y ganaron tranquilidad
        </p>

        {/* GRID */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {/* TESTIMONIO 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border p-6 rounded-2xl text-left hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=49"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Mariana Fagunes</p>
                <p className="text-sm text-muted">PyME</p>
              </div>
            </div>

            <div className="mt-4 text-yellow-400">★★★★★</div>

            <p className="mt-4 text-muted">
              “Desde que trabajamos con DUCA, todo es más simple. Nos olvidamos de los problemas contables.”
            </p>
          </motion.div>

          {/* TESTIMONIO 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border p-6 rounded-2xl text-left hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=52"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Marcos Zeni</p>
                <p className="text-sm text-muted">Comercio</p>
              </div>
            </div>

            <div className="mt-4 text-yellow-400">★★★★★</div>

            <p className="mt-4 text-muted">
              “Excelente servicio. Muy claros, rápidos y siempre disponibles.”
            </p>
          </motion.div>

          {/* TESTIMONIO 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border p-6 rounded-2xl text-left hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=3"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Fernando Gubitosi</p>
                <p className="text-sm text-muted">Profesional Independiente</p>
              </div>
            </div>

            <div className="mt-4 text-yellow-400">★★★★★</div>

            <p className="mt-4 text-muted">
              “Me ayudaron a ordenar mis cuentas y trabajar sin preocupaciones.”
            </p>
          </motion.div>
        </div>
        {/* COMO FUNCIONA */}
        <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto text-center">

          {/* TITULO */}
          <h2 className="text-4xl font-semibold">
            Cómo funciona
          </h2>

          <p className="mt-4 text-muted">
            Empezar con DUCA es simple, rápido y sin complicaciones
          </p>

          {/* PASOS */}
          <div className="mt-16 grid md:grid-cols-3 gap-10">

            {/* PASO 1 */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              ></motion.div>
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                1
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Nos contactás
              </h3>

              <p className="mt-2 text-muted max-w-xs">
                Completás el formulario o nos escribís por WhatsApp.
              </p>
            </div>

            {/* PASO 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                2
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Analizamos tu caso
              </h3>

              <p className="mt-2 text-muted max-w-xs">
                Evaluamos tu situación y te proponemos la mejor solución.
              </p>
            </div>

            {/* PASO 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                3
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Nos ocupamos de todo
              </h3>

              <p className="mt-2 text-muted max-w-xs">
                Gestionamos tu contabilidad para que te enfoques en crecer.
              </p>
            </div>

          </div>
        </section>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="px-6 md:px-10 py-12 text-center">

        <div className="max-w-3xl mx-auto p-10 md:p-14 relative">

          {/* GLOW SUAVE */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute w-72 h-72 bg-primary blur-3xl top-[-80px] left-[-80px]" />
            <div className="absolute w-72 h-72 bg-blue-400 blur-3xl bottom-[-80px] right-[-80px]" />
          </div>

          {/* CONTENIDO */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Dejá de preocuparte por la contabilidad
            </h2>

            <p className="mt-6 text-lg text-muted">
              Nosotros nos ocupamos de todo para que vos te enfoques en hacer crecer tu negocio.
            </p>

            {/* BOTONES */}
            <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

              <button
                onClick={() => {
                  setForm({ nombre: "", email: "", mensaje: "" });
                  setEstado("idle");
                  yaScrolleado.current = false;
                  setMostrarFormulario(true);
                }}
                className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition"
              >
                Contactanos
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                className="border border-border px-8 py-4 rounded-xl text-lg hover:bg-surface transition"
              >
                Hablar por WhatsApp
              </a>

            </div>

            {/* MINI TEXTO */}
            <p className="mt-6 text-sm text-muted">
              Respuesta en menos de 24 horas • Sin compromiso
            </p>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      {
        mostrarFormulario && (<section
          id="formulario"
          ref={formularioRef}
          className="max-w-xl mx-auto px-6 py-32"
        >
          {/* Header */}
          <div className="grid grid-cols-3 items-center mb-6">

            <div /> {/* columna izquierda vacía */}

            <h2 className="text-2xl text-center">Contacto</h2>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  console.log("click cerrar");
                  setMostrarFormulario(false);
                  yaScrolleado.current = false;

                  setTimeout(() => {
                    const seccion = document.getElementById("contacto");
                    seccion?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 50);
                }}
                className="bg-white/60 backdrop-blur-md 
             rounded-full p-1.5
             text-gray-500 hover:text-gray-700
             transition"
              >
                ✕
              </button>
            </div>
          </div>

          {estado === "ok" && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-4 text-center">
              Mensaje enviado correctamente
            </div>
          )}

          {estado === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4 text-center">
              Error al enviar
            </div>
          )}

          {estado !== "ok" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-3 rounded bg-surface border border-border"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
              <input
                className="p-3 rounded bg-surface border border-border"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <textarea
                className="p-3 rounded bg-surface border border-border"
                placeholder="Mensaje"
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                required
              />
              <button
                disabled={enviando}
                className="bg-primary text-white p-3 rounded disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
        </section>)
      }

      {/* FOOTER */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

          {/* MARCA */}
          <div>
            <h3 className="text-lg font-semibold text-text">DUCA</h3>
            <p className="mt-3 text-muted">
              Estudio Contable Impositivo de Natalia Dutra Casero.<br />
              Tu confianza, nuestra responsabilidad. Tu tranquilidad, nuestro compromiso.
            </p>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h4 className="font-semibold text-text">Navegación</h4>
            <ul className="mt-3 space-y-2 text-muted">
              <li><a href="#inicio" className="hover:text-primary">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-primary">Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-primary">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-primary">Contacto</a></li>
            </ul>
          </div>
          {/* REDES SOCIALES */}
          <div>
            <h4 className="font-semibold text-text">Redes Sociales</h4>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit hover:text-primary transition">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition">
                    <FaTiktok />
                  </span>
                  TikTok
                </a>
              </li>

              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit hover:text-primary transition">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition">
                    <FaInstagram />
                  </span>
                  Instagram
                </a>
              </li>

              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit hover:text-primary transition">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition">
                    <FaFacebook />
                  </span>
                  Facebook
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/eciduca/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit hover:text-primary transition">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition">
                    <FaLinkedin />
                  </span>
                  Linkedin
                </a>
              </li>

              <li>
                <a href="https://www.youtube.com/@DucaECI" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit hover:text-primary transition">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-sm hover:bg-primary hover:text-white transition">
                    <FaYoutube />
                  </span>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          {/* CONTACTO */}
          <div>
            <h4 className="font-semibold text-text">Contacto</h4>
            <ul className="mt-3 space-y-2 text-muted">
              <li>Email: natalia.dutra.casero@gmail.com</li>
              <li>Tel: +598 98 635 267</li>
              <li>
                <a
                  href="https://wa.me/59898635267"
                  target="_blank"
                  className="hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
              {/* 📍 Ubicación */}
              <li className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-primary" />
                Uruguay
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-border py-6 text-center text-xs text-muted">
          © 2026 DUCA. Todos los derechos reservados. <br />

          Diseñado y desarrollado por{" "}
          <a
            href="https://tuempresa.com"
            target="_blank"
            className="text-primary hover:underline"
          >
            Arianus
          </a>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href={whatsappUrl}
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg z-50 flex items-center justify-center text-white text-2xl"
      >
        <FaWhatsapp />
      </a>
    </main >
  );
}