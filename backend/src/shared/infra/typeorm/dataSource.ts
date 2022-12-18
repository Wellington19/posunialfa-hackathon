import 'dotenv/config'
import path from 'path'
import { DataSource } from 'typeorm'

const basePath = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const extensionPath = process.env.NODE_ENV === 'production' ? '*.js' : '*.ts'

export const MyDBDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
  logging: false,
  entities: [path.resolve(process.cwd(), basePath, 'modules', '**', 'infra', 'typeorm', 'entities', extensionPath)],
  migrations: [path.resolve(process.cwd(), basePath, 'shared', 'infra', 'typeorm', 'migrations', extensionPath)]
})
