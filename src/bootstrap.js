const dotenv = require('dotenv')

const getPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return '.env'
    case 'development': return '.env.dev'
  }
}

const path = getPath()

dotenv.config({ path })
