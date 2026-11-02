import { test, expect } from '../fixtures/auth.fixture';
import { usuarioPadrao } from '../data/usuarios.data';

test.describe('Área Restrita - Sessão Autenticada via Fixture (LojaQA)', () => {
  test('CT - Painel: inicia direto na área logada sem digitar credenciais', async ({
    page,
    dashboardPage,
  }) => {
    await expect(page).toHaveURL(/painel\.html$/);
    await expect(dashboardPage.tituloPainel).toHaveText('Minha Conta');
    await expect(dashboardPage.badgePerfil).toHaveText('USER');
  });

  test('CT - Painel: exibe o identificador do usuário autenticado', async ({ dashboardPage }) => {
    await expect(dashboardPage.resumoUsuario).toHaveText(`${usuarioPadrao.nome} · USER`);
  });

  test('CT - Painel: perfil mostra nome, e-mail e perfil de acesso', async ({ dashboardPage }) => {
    await expect(dashboardPage.dadosPerfil).toContainText(usuarioPadrao.nome);
    await expect(dashboardPage.dadosPerfil).toContainText(usuarioPadrao.email);
    await expect(dashboardPage.dadosPerfil).toContainText('USER');
  });

  test('CT - Painel: botão Sair está visível na área restrita', async ({ dashboardPage }) => {
    await expect(dashboardPage.botaoSair).toBeVisible();
  });

  test('CT - Painel: logout devolve a aplicação ao estado deslogado', async ({
    page,
    dashboardPage,
  }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/loja\.html$/);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });

  test('CT - Painel: após logout, painel redireciona para o login', async ({
    page,
    dashboardPage,
    loginPage,
  }) => {
    await dashboardPage.logout();
    await dashboardPage.acessar();
    await expect(page).toHaveURL(/login\.html$/);
    await expect(loginPage.titulo).toBeVisible();
  });
});
