import { MyDBDataSource } from './dataSource'

MyDBDataSource.initialize().then(async () => {
  console.log(`🎲 Conexão com banco de dados ${MyDBDataSource.options.database} realizada com sucesso!`)
}).catch(error => {
  console.log(`🎲 Falha ao conectar com banco de dados ${MyDBDataSource.options.database}: `, error)
})
