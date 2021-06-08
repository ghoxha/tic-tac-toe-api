const storage = require('node-persist')

module.exports = {
    initStorage: async () => {
        await storage.init({
            dir: './persisted',

            stringify: JSON.stringify,

            parse: JSON.parse,

            encoding: 'utf8',

            logging: false,

            ttl: false,

            expiredInterval: 2 * 60 * 1000,

            forgiveParseErrors: false
      })},
    store: async (XorOMove, ttlNumOfMoves, move) => {
        await storage.setItem(`${XorOMove}:${ttlNumOfMoves + 1}`, move)
    },
    clearStorage: async () => {
        await storage.clear()
    },
    numberOfStoredElements: async () => {
        return await storage.length()

    },
    storageKeys: async () => {
        return await storage.keys()
    },
    storageValues: async () => {
        return await storage.values()
    }
}
