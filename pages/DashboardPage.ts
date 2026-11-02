import { Locator, Page } from '@playwright/test';

/**
 * Page Object da Área Restrita da LojaQA (painel.html).
 * Regra inegociável: asserções vivem somente nos specs.
 */
export class DashboardPage {
  static readonly CAMINHO = 'painel.html';

  /** Título da página conforme o perfil ("Minha Conta", "Painel do Lojista"...) */
  readonly tituloPainel: Locator;
  /** Badge do perfil de acesso (USER / SELLER / ADMIN) */
  readonly badgePerfil: Locator;
  /** Identificador do usuário autenticado ("Nome · PERFIL") */
  readonly resumoUsuario: Locator;
  /** Cartões do perfil: Nome Completo, E-mail e Perfil de Acesso */
  readonly dadosPerfil: Locator;
  /** Botão "Sair" */
  readonly botaoSair: Locator;

  constructor(private page: Page) {
    this.tituloPainel = page.locator('#panelTitle');
    this.badgePerfil = page.locator('#roleBadge');
    this.resumoUsuario = page.locator('#userSummary');
    this.dadosPerfil = page.locator('#profileMetrics');
    this.botaoSair = page.locator('#logoutButton');
  }

  async acessar(): Promise<void> {
    await this.page.goto(DashboardPage.CAMINHO);
  }

  /** Espera ativa da área restrita (URL + título preenchido), sem pausas fixas. */
  async aguardarCarregamento(): Promise<void> {
    await this.page.waitForURL(`**/${DashboardPage.CAMINHO}`);
    await this.tituloPainel.waitFor({ state: 'visible' });
  }

  /** Executa a saída do sistema, devolvendo a aplicação ao estado deslogado. */
  async logout(): Promise<void> {
    await this.botaoSair.click();
    await this.page.waitForURL('**/loja.html');
  }
}
