/**
 * Massa de dados tipada para os cenários de login (Data-Driven).
 * Credenciais públicas exibidas na própria tela de login da LojaQA
 * ("Massa de dados para QA").
 */
export interface CenarioLogin {
  descricao: string;
  usuario: string;
  senha: string;
  sucesso: boolean;
  /** Mensagem esperada: título do painel (sucesso) ou erro exibido (falha) */
  mensagemEsperada?: string;
  /** Perfil exibido no badge do painel (apenas quando sucesso = true) */
  perfilEsperado?: 'USER' | 'SELLER' | 'ADMIN';
  /** true quando a validação do front impede o envio (botão Entrar desabilitado) */
  bloqueadoNoFront?: boolean;
}

export const usuarioPadrao = {
  email: 'user@system.com',
  senha: 'UserPassword123',
  nome: 'Usuário Padrão',
} as const;

export const listaUsuarios: CenarioLogin[] = [
  {
    descricao: 'Cliente Válido',
    usuario: 'user@system.com',
    senha: 'UserPassword123',
    sucesso: true,
    mensagemEsperada: 'Minha Conta',
    perfilEsperado: 'USER',
  },
  {
    descricao: 'Administrador Válido',
    usuario: 'admin@system.com',
    senha: 'AdminPassword123',
    sucesso: true,
    mensagemEsperada: 'Painel Administrativo',
    perfilEsperado: 'ADMIN',
  },
  {
    descricao: 'Lojista Válido',
    usuario: 'lojista@system.com',
    senha: 'SellerPass123',
    sucesso: true,
    mensagemEsperada: 'Painel do Lojista',
    perfilEsperado: 'SELLER',
  },
  {
    descricao: 'Usuário Bloqueado',
    usuario: 'blocked@system.com',
    senha: 'Blocked123',
    sucesso: false,
    mensagemEsperada: 'Usuário bloqueado.',
  },
  {
    descricao: 'Senha Incorreta',
    usuario: 'user@system.com',
    senha: 'SenhaErrada123',
    sucesso: false,
    mensagemEsperada: 'Credenciais inválidas.',
  },
  {
    descricao: 'Usuário Inexistente',
    usuario: 'naoexiste@system.com',
    senha: 'UserPassword123',
    sucesso: false,
    mensagemEsperada: 'Erro: usuário não encontrado.',
  },
  {
    descricao: 'E-mail em Formato Inválido',
    usuario: 'usuario-sem-arroba',
    senha: 'UserPassword123',
    sucesso: false,
    bloqueadoNoFront: true,
  },
  {
    descricao: 'Senha com Menos de 8 Caracteres',
    usuario: 'user@system.com',
    senha: '1234567',
    sucesso: false,
    bloqueadoNoFront: true,
  },
];
