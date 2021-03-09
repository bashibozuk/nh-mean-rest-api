const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://blog-app:bl0g@pp@blog-app.wy9e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

class Client {
    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    getClient() {
        return this.client;
    }

}



module.exports = () => {
    const client = new Client();
    return client.getClient();
}