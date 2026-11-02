import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { usuarioPadrao } from '../data/usuarios.data';

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Custom test com estado autenticado injetado.
 * Quem consome `dashboardPage` já começa no painel.html,
 * sem digitar credenciais no corpo do teste.
 */
export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page, loginPage }, use) => {
    // 1. Navegação para o login
    await loginPage.acessar();
    // 2. Preenchimento das credenciais válidas + 3. submissão
    await loginPage.login(usuarioPadrao.email, usuarioPadrao.senha);
    // 4. Espera ativa da URL/elemento restrito
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.aguardarCarregamento();
    // 5. Disponibiliza a página pronta para o teste
    await use(dashboardPage);
  },
});

export { expect };
