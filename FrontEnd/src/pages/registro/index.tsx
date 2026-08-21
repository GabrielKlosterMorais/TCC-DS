import React, { useState, FormEvent } from 'react'
import './styles.css'

// Tipagem do formulário de registro.
// Define os campos esperados pelo formulário e pelo backend.
interface RegisterForm {
    nomeCliente: string
    cpf: string
    telefone: string
    email: string
    endereco: string
    dataNascimento?: string
    senha: string
    confirmarSenha?: string
}

// Componente funcional de registro.
const Registro: React.FC = () => {
    // Estado que guarda todos os campos do formulário em um único objeto.
    const [form, setForm] = useState<RegisterForm>({
        nomeCliente: '',
        cpf: '',
        telefone: '',
        email: '',
        endereco: '',
        dataNascimento: undefined,
        senha: '',
        confirmarSenha: '',
    })

    // Estado de carregamento para indicar que a requisição está em andamento.
    const [loading, setLoading] = useState(false)
    // Estado para armazenar mensagens de erro e exibir ao usuário.
    const [error, setError] = useState<string | null>(null)

    // handleChange: atualiza o campo do formulário correspondente ao input.
    // Usa o atributo `id` do input para mapear para a propriedade do objeto `form`.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setForm((prev) => ({ ...prev, [id]: value }))
    }

    // handleSubmit: valida campos e envia os dados ao backend.
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validação simples: verifica se senhas batem.
        if (form.senha !== form.confirmarSenha) {
            setError('As senhas não coincidem.')
            return
        }

        setLoading(true)

        try {
            // Monta o payload com os campos que o backend espera.
            const payload = {
                nomeCliente: form.nomeCliente,
                cpf: form.cpf,
                telefone: form.telefone,
                email: form.email,
                endereco: form.endereco,
                senha: form.senha,
            }

            // Envia POST para o endpoint de criação de cliente.
            const res = await fetch('http://localhost:3001/Cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            // Se o backend retornou erro, tenta ler a mensagem de erro do body.
            if (!res.ok) {
                const body = await res.json().catch(() => null)
                setError((body && body.message) || 'Erro ao criar usuário')
                setLoading(false)
                return
            }

            // Cadastro realizado com sucesso — redireciona para a tela de login.
            window.location.href = '/login'

        } catch (err) {
            // Erro de rede ou outro erro inesperado.
            setError('Erro de conexão com o servidor')
        } finally {
            // Sempre limpa o estado de loading quando a operação termina.
            setLoading(false)
        }
    }

    // Renderização do JSX do formulário de registro.
    return (
        <main className="register-container">
            <section className="register-banner">
                {/* Imagem ilustrativa do banner */}
                <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                    alt="Cachorro"
                    className="banner-image"
                />

                <div className="banner-content">
                    <div className="logo">
                        {/* Título da marca no banner */}
                        <h1 className="logo-text">PetCare</h1>
                    </div>

                    <div className="banner-text">
                        {/* Texto explicativo do banner */}
                        <h2>Crie sua conta e cuide ainda melhor do seu pet.</h2>
                        <p>
                            Tenha acesso aos serviços, agendamentos e informações dos seus
                            pets.
                        </p>
                    </div>
                </div>
            </section>

            <section className="register-form-container">
                <div className="register-form">
                    <div className="mobile-logo">
                        <h1>PetCare</h1>
                    </div>

                    <div className="form-header">
                        <h2>Crie sua conta</h2>
                        <p>Preencha seus dados para começar.</p>
                    </div>

                    {/* Formulário controlado: os inputs são sincronizados com `form` */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-row">
                            <div className="input-group">
                                <label htmlFor="nomeCliente">Nome</label>
                                <div className="input-wrapper">
                                    {/* Input para nome do cliente */}
                                    <input
                                        type="text"
                                        id="nomeCliente"
                                        value={form.nomeCliente}
                                        onChange={handleChange}
                                        placeholder="Seu nome"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="telefone">Telefone</label>
                                <div className="input-wrapper">
                                    {/* Input para telefone */}
                                    <input
                                        type="tel"
                                        id="telefone"
                                        value={form.telefone}
                                        onChange={handleChange}
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <div className="input-wrapper">
                                {/* Input para e-mail */}
                                <input
                                    type="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Digite seu e-mail"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="dataNascimento">Data de nascimento</label>
                            <div className="input-wrapper">
                                {/* Input para data de nascimento */}
                                <input
                                    type="date"
                                    id="dataNascimento"
                                    value={form.dataNascimento || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="endereco">Endereço</label>
                            <div className="input-wrapper">
                                {/* Input para endereço */}
                                <input
                                    type="text"
                                    id="endereco"
                                    value={form.endereco}
                                    onChange={handleChange}
                                    placeholder="Digite seu endereço"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label htmlFor="senha">Senha</label>
                                <div className="input-wrapper">
                                    {/* Input para senha */}
                                    <input
                                        type="password"
                                        id="senha"
                                        value={form.senha}
                                        onChange={handleChange}
                                        placeholder="Digite sua senha"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmarSenha">Confirmar senha</label>
                                <div className="input-wrapper">
                                    {/* Input para confirmação de senha */}
                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        value={form.confirmarSenha}
                                        onChange={handleChange}
                                        placeholder="Repita sua senha"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <label className="terms">
                            {/* Checkbox para aceitar termos */}
                            <input type="checkbox" required />
                            <span>
                                Li e aceito os <a href="#">termos de uso</a>
                            </span>
                        </label>

                        {/* Exibe mensagem de erro se existir */}
                        {error && <div className="form-error">{error}</div>}

                        {/* Botão de envio, desabilitado enquanto estiver carregando */}
                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? 'Cadastrando...' : 'Criar conta'}
                        </button>
                    </form>

                    <div className="login">
                        <p>Já possui uma conta?</p>
                        <a href="/login">Entrar</a>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Registro