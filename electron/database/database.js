const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Cria a tabela CONFIGURACAO
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS CONFIGURACAO (
      CONFIGURACAO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      SENHA_SUDO TEXT,
      CONFIGURACAO_VPN_ID INTEGER,
      FOREIGN KEY (CONFIGURACAO_VPN_ID) REFERENCES CONFIGURACAO_VPN(CONFIGURACAO_VPN_ID)
    )
  `);
});

// Cria a tabela CONFIGURACAO_VPN
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS CONFIGURACAO_VPN (
      CONFIGURACAO_VPN_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      USUARIO TEXT,
      SENHA TEXT,
      CONECTAR_AUTO BOOLEAN,
      PROVEDOR_ID INTEGER,
      FOREIGN KEY (PROVEDOR_ID) REFERENCES PROVEDOR(PROVEDOR_ID)
    )
  `);
});

// Cria a tabela PROVEDOR
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS PROVEDOR (
      PROVEDOR_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      IP TEXT,
      NOME TEXT,
      PORTA TEXT,
      TRUSTED_CERT TEXT
    )
  `);

  // Verifica se a tabela PROVEDOR já contém registros
  db.get('SELECT COUNT(*) AS count FROM PROVEDOR', (err, row) => {
    if (err) {
      console.error('Erro ao verificar registros na tabela PROVEDOR:', err);
    } else if (row.count === 0) {
      // Insere registros padrão na tabela PROVEDOR
      const insertStmt = db.prepare(`
        INSERT INTO PROVEDOR (IP, NOME, PORTA, TRUSTED_CERT) VALUES (?, ?, ?, ?)
      `);

      insertStmt.run('187.109.105.239', 'Ampernet', '10443', '734c77753790cdc9f36164652b93269c2edbb7a28580942ba7055d35cad48974a');
      insertStmt.run('200.195.135.2', 'Copel', '10443', '734c77753790cdc9f36164652b93269c2edbb7a28580942ba7055d35cad48974a');
      insertStmt.run('177.137.56.133', 'Empire', '10443', '734c77753790cdc9f36164652b93269c2edbb7a28580942ba7055d35cad48974a');

      insertStmt.finalize();
    }
  });
});

module.exports = db;