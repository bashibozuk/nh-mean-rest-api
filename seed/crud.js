const mongoClient = require('./mongo-client');
const {ObjectID} = require('mongodb');

class Crud {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    async create(items) {
        const client = mongoClient();
        await client.connect();
        const db = client.db(this.db);
        console.log(items);
        await db.collection(this.collection).insertMany(items);
        client.close();
    }

    read(filter, projection) {
        const client = mongoClient();
        return new Promise(async (resolve, reject) => {
            await client.connect();
            const db = client.db(this.db);
            try {
                
                const result = db.collection(this.collection).find(filter || {}, projection || {});
                const data = await result.toArray();
                console.log('on data')
                resolve(data);
            } catch (e) {
                reject(e);
            } finally {
                console.log('on finaly')
                client.close();
            }
        });
        
    }

    byID(id) {
        const client = mongoClient();
        return new Promise(async (resolve, reject) => {
            await client.connect();
            const db = client.db(this.db);
            try {
                const result = await db.collection(this.collection).findOne({_id: ObjectID(id)});
                resolve(result);
            } catch (e) {
                reject(e);
            } finally {
                client.close();
            }
        }); 
    }

    update(filter, fields) {
        const client = mongoClient();
        return new Promise(async (resolve, reject) => {
            await client.connect();
            const db = client.db(this.db);
            try {
                const result = await db.collection(this.collection)
                    .updateMany(filter, fields);
                resolve(result);
            } catch (e) {
                reject(e);
            } finally {
                client.close();
            }
        });
    }
    
    updateByID(id, fields) {
        const client = mongoClient();
        return new Promise(async (resolve, reject) => {
            await client.connect();
            const db = client.db(this.db);
            try {
                const result = await db.collection(this.collection)
                    .findOneAndUpdate({_id: ObjectID(id)}, {"$set" : fields});
                console.log(result)
                resolve(result);
            } catch (e) {
                reject(e);
            } finally {
                client.close();
            }
        });
    }

    delete(filter) {
        const client = mongoClient();
        return new Promise(async (resolve, reject) => {
            await client.connect();
            const db = client.db(this.db);
            try {
                const result = await db.collection(this.collection).deleteMany(filter);
                resolve(result);
            } catch (e) {
                reject(e);
            } finally {
                client.close();
            }
        });
    }

    deleteByID(id) {
        return this.delete({_id: ObjectID(id)});
    }
}

module.exports = Crud;