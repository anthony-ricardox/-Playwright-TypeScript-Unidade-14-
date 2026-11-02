import { Locator, Page } from '@playwright/test';

/**
 * Page Object da tela de Login da LojaQA (login.html).
 * Regra: sem asserções aqui — apenas mapeamento e ações.
 */
export class LoginPage {
  static readonly CAMINHO = 'login.html';

  readonly titulo: Locator;
  readonly campoEmail: Locator;
  readonly campoSenha: Locator;
  readonly botaoEntrar: Locator;
  readonly mensagemErro: Locator;
  readonly mensagemStatus: Locator;

  constructor(private page: Page) {
    this.titulo = page.getByRole('heading', { name: 'Acesso à LojaQA' });
    this.campoEmail = page.locator('#email');
    this.campoSenha = page.locator('#password');
    this.botaoEntrar = page.locator('#loginBtn');
    this.mensagemErro = page.locator('#errorMessage');
    this.mensagemStatus = page.locator('#statusMessage');
  }

  async acessar(): Promise<void> {
    await this.page.goto(LoginPage.CAMINHO);
  }

  async preencherCredenciais(email: string, senha: string): Promise<void> {
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(senha);
  }

  async submeter(): Promise<void> {
    await this.botaoEntrar.click();
  }

  async login(email: string, senha: string): Promise<void> {
    await this.preencherCredenciais(email, senha);
    await this.submeter();
  }
}
