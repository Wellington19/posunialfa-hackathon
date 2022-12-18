"use strict";

var _dataSource = require("./dataSource");
_dataSource.MyDBDataSource.initialize().then(async () => {
  console.log(`🎲 Conexão com banco de dados ${_dataSource.MyDBDataSource.options.database} realizada com sucesso!`);
}).catch(error => {
  console.log(`🎲 Falha ao conectar com banco de dados ${_dataSource.MyDBDataSource.options.database}: `, error);
});