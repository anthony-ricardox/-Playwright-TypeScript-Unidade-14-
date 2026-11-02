import { test, expect } from '../fixtures/auth.fixture';
import { DashboardPage } from '../pages/DashboardPage';
import { listaUsuarios } from '../data/usuarios.data';

test.describe('Login - Data-Driven (LojaQA)', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.acessar();
    await expect(loginPage.titulo).toBeVisible();
  });

  for (const cenario of listaUsuarios) {
    test(`CT - Login: ${cenario.descricao}`, async ({ page, loginPage }) => {
      if (cenario.bloqueadoNoFront) {
        // Validação do front: com dados inválidos o botão Entrar fica desabilitado
        await loginPage.preencherCredenciais(cenario.usuario, cenario.senha);
        await expect(loginPage.botaoEntrar).toBeDisabled();
        await expect(page).toHaveURL(/login\.html$/);
        return;
      }

      await loginPage.login(cenario.usuario, cenario.senha);

      if (cenario.sucesso) {
        const dashboardPage = new DashboardPage(page);
        await expect(page).toHaveURL(/painel\.html$/);
        await expect(dashboardPage.tituloPainel).toHaveText(cenario.mensagemEsperada!);
        await expect(dashboardPage.badgePerfil).toHaveText(cenario.perfilEsperado!);
      } else {
        await expect(loginPage.mensagemErro).toBeVisible();
        await expect(loginPage.mensagemErro).toContainText(cenario.mensagemEsperada!);
        await expect(page).toHaveURL(/login\.html$/);
      }
    });
  }
});
