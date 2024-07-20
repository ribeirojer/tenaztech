import axios from 'axios';
import React, { useRef, useState } from 'react'

type Props = {}

const Newsletter = (props: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: "",
    emailRegex: "",
    general: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const closeSuccess = () => {
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError({ ...error, email: "Por favor digite seu email." });
      emailRef.current?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError({ ...error, email: "", emailRegex: "Formato de email inválido." });
      emailRef.current?.focus();
      return;
    }

    setLoading(true);
    axios.post("/api/newsletter", { email }) 
      .then((response) => {
        setLoading(false);
        setEmail("");
        setError({ email: "", emailRegex: "", general: "" });
        setSuccess("Inscrição realizada com sucesso!");
        closeSuccess();
      })
      .catch((error) => {
        setLoading(false);
        setSuccess("");
        setError({
          ...error,
          general: "Ocorreu um erro ao realizar a inscrição.",
        });
      });
  };

  return (
    <section className="bg-[url('/grafico_apoio.png')] py-12 md:py-16 bg-fixed bg-cover opacity-10" >
      <div className="container max-w-2xl px-4 md:px-6">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Mantenha-se atualizado com nossas últimas notícias e ofertas</h2>
          <p className="text-muted-foreground">
            Assine nossa newsletter e seja o primeiro a saber sobre nossos novos produtos, ofertas exclusivas e muito mais.
          </p>
          <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Digite seu email" 
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
            {error.email && (
              <span className="text-red-500 mt-1">{error.email}</span>
            )}
            {error.emailRegex && (
              <span className="text-red-500 mt-1">{error.emailRegex}</span>
            )}
            <button 
              type="submit" 
              className="px-4 py-2 mt-2 text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              {loading ? 'Carregando...' : 'Assinar'}
            </button>
          </form>
          {error.general && (
            <span className="text-red-500 mt-1 text-center">
              {error.general}
            </span>
          )}
          {success && (
            <span className="text-green-500 text-center">{success}</span>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
