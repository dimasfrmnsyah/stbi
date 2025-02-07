const dbConf = {
	production: 'mongodb+srv://backupdimasfrmnsyh5:yivNICqC49LfXvoP@stbi.5alzh.mongodb.net/?retryWrites=true&w=majority&appName=stbi";',
}



const ENV = 'production'
const db = dbConf[ENV]

const conf = {
	db,
}

module.exports = conf