export default () => ({
    databaseConfigs: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: true, // TRUE APENAS EM AMBIENTE DE DEV
    }
})