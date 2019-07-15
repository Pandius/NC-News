const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: 'pawel',
      password: 'Diablo84'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: 'pawel',
      password: 'Diablo84'
    }
  }
};

module.exports = {...customConfig[ENV], ...baseConfig};
