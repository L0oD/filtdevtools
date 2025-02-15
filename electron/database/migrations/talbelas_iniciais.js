exports.up = function(knex) {
    return knex.schema
      .createTable('PROVEDOR', function(table) {
        table.increments('PROVEDOR_ID').primary();
        table.string('IP').notNullable();
        table.string('NOME').notNullable();
        table.string('PORTA').notNullable();
        table.string('TRUSTED_CERT').notNullable();
      })
      .createTable('CONFIGURACAO_VPN', function(table) {
        table.increments('CONFIGURACAO_VPN_ID').primary();
        table.boolean('CONECTAR_AUTO').notNullable();
        table.integer('PROVEDOR_ID').unsigned().notNullable();
        table.foreign('PROVEDOR_ID').references('PROVEDOR_ID').inTable('PROVEDOR');
        table.integer('USUARIO_VPN_ID').unsigned().notNullable();
        table.foreign('USUARIO_VPN_ID').references('USUARIO_VPN_ID').inTable('USUARIO_VPN');
      })
      .createTable('USUARIO_VPN', function(table) {
        table.increments('USUARIO_VPN_ID').primary();
        table.string('USUARIO').notNullable();
        table.string('SENHA').notNullable
      })
      .createTable('CONFIGURACAO', function(table) {
        table.increments('CONFIGURACAO_ID').primary();
        table.string('SENHA_SUDO').notNullable();
        table.integer('CONFIGURACAO_VPN_ID').unsigned();
        table.foreign('CONFIGURACAO_VPN_ID').references('CONFIGURACAO_VPN_ID').inTable('CONFIGURACAO_VPN');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('CONFIGURACAO')
      .dropTable('CONFIGURACAO_VPN')
      .dropTable('PROVEDOR')
      .dropTable('USUARIO_VPN');
  };