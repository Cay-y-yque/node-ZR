class contactsDAO{

    static async getUsers(client){
        const cursor = await client
        .find()
        .project({_id: 0}) // 1 para ver campo, 0 para não ver campo no cursor;
        .sort({nome: 1})
        .limit(10)
        try {
            const results = await cursor.toArray()
            return results
        } catch(err){
            console.log(err);
        }
    }

    static async insertUser(client, doc){
        const ok = await client
        .insertOne(doc);
        try{
            return ok
        } catch(err){
            console.log(err);
        }
    }

    static async updateTelefoneByEmail(client, olde, tel){
        const docs = await client
        .updateOne(olde,tel);
        try{
            return docs;
        } catch(err){
            console.log(err)
        }
    }

    static async deleteUserByName(client, name){
        const ok = await client
        .deleteOne(name);

        try{
            return ok;
        } catch(err){
            console.log(err);
        }
    }

}

module.exports = contactsDAO;