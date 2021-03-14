const mongoose = require('mongoose');

class RestRoute{
    constructor(router, model, collectionName) {
        this.router = router;
        this.model = model;
        this.collectionName = collectionName
    }

    registerRoutes() {
        console.log(`get: /${this.collectionName}`)
        this.router.get(`/${this.collectionName}`, async (req, res) => {
            this.find(req, res)
        });
        console.log(`get: /${this.collectionName}/:id`)
        this.router.get(`/${this.collectionName}/:id`, async (req, res) => {
            this.findById(req, res);
        });
        
        console.log(`post: /${this.collectionName}`)
        this.router.post(`/${this.collectionName}`, async (req, res) => {
            this.create(req, res);
        });
        
        console.log(`put: /${this.collectionName}/:id`)
        this.router.put(`/${this.collectionName}/:id`, async (req, res) => {
            const existing = await this.getFindByIdClause(req.params.id).exec();
            if (!existing) {
                return res.status(404).json(new Error('Not Found'));
            }
            const result = await this.model.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(req.params.id)
            }, req.body, (err, result) => {
                if (err ) {
                    return res.status(500).json(err);
                }

                res.status(200).json(result);
            }).exec();

            console.log('on put', result, req.body);
        });
        console.log(`delete: /${this.collectionName}/:id`)
        this.router.delete(`/${this.collectionName}/:id`, async (req, res) => {
            const existing = await this.getFindByIdClause(req.params.id).exec();
            if (!existing) {
                return res.status(404).json(new Error('Not Found'));
            }

            this.model.deleteOne({
                _id: mongoose.Types.ObjectId(existing._id)
            },(err, result) => {
                if (err ) {
                    return res.status(500).json(err);
                }

                res.status(200).json(result);
            })
        });
    }

    getFindByIdClause(id) {
        return this.model.findOne({
            _id: mongoose.Types.ObjectId(id)
        });
    }

    async find(req, res) {
        try {
            const data= await this.model.find().exec();
            res.status(200).json(data);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async findById(req, res) {
        try {
            const data= await this.getFindByIdClause(req.params.id).exec();
            res.status(200).json(data);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    create(req, res) {
        const note = new (this.model)(req.body);
        note.save((err, note) => {
            if (err ) {
                return res.status(500).json(err);
            }

            res.status(200).json(note);
        });
    }

}

module.exports = RestRoute;