const db = require('../../../database/knex');

function registerUsuarioVpnHandler(ipcMain) {
  ipcMain.handle('obter-usuarios-vpn', async () => {
    try {
      const rows = await db('USUARIO_VPN').select('*');
      return rows;
    } catch (err) {
      console.error('Erro ao obter usuários VPN do banco de dados:', err);
      throw new Error('Erro ao obter usuários VPN do banco de dados.');
    }
  });

  ipcMain.handle('salvar-usuario-vpn', async (event, usuarioVpn) => {
    try {
      if (usuarioVpn.usuarioVpnId) {
        await db('USUARIO_VPN').update({
          USUARIO: usuarioVpn.usuario,
          SENHA: usuarioVpn.senha
        }).where('USUARIO_VPN_ID', usuarioVpn.usuarioVpnId);
      } else {
        const [id] = await db('USUARIO_VPN').insert({
          USUARIO: usuarioVpn.usuario,
          SENHA: usuarioVpn.senha
        });
        usuarioVpn.usuarioVpnId = id;
      }
      return usuarioVpn;
    } catch (err) {
      console.error('Erro ao salvar usuário VPN no banco de dados:', err);
      throw new Error('Erro ao salvar usuário VPN no banco de dados.');
    }
  });
}

module.exports = { registerUsuarioVpnHandler };