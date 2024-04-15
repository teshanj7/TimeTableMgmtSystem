let Resource = require("../models/resource");

//create new resource
const createResource = async(req, res) => {
    const { resourceName, resourceCode, description, faculty, availablity } = req.body;

    const newResource = new Resource({
        resourceName,
        resourceCode,
        description,
        faculty,
        availablity
    })

    newResource.save().then(() => {
        //validations
        if (!resourceName || !resourceCode || !description || !faculty ) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Resource Entity was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all resources
const getAllResources = async(req, res) => {

    Resource.find().then((resources) => {
        res.json(resources)
    }).catch((error) => {
        console.log(error);
    })
}

//update a resource by id
const updateResource = async (req, res) => {
    let resourceId = req.params.id;
    const { resourceName, resourceCode, description, faculty, availablity } = req.body;

    const updateResource= {
        resourceName,
        resourceCode,
        description,
        faculty,
        availablity
    }

    const update = await Resource.findByIdAndUpdate(resourceId, updateResource).then(() => {
        res.status(200).send({ status: "Resource Entity successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Resource update unsuccessful, try again", error: error.message });
    })
}

//delete resource by id
const deleteResource = async (req, res) => {

    let resourceId = req.params.id;

    await Resource.findByIdAndDelete(resourceId).then(() => {
        res.status(200).send({ status: "Resource deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Resource deletion unsuccessful!", error: error.message });
    })
}

//view one specific resource by id
const viewOneResourceById = async (req, res) => {
    let resourceId = req.params.id;

    const resource = await Resource.findById(resourceId).then((resource) => {
        res.status(200).send({ resource });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the resource!", error: error.message });
    })
}

//search room
const searchResource =
    async (req, resp) => {
        let result = await Resource.find({
            "$or": [
                {
                    resourceName: { $regex: req.params.key }
                },
                {
                    resourceCode: { $regex: req.params.key }
                },
                {
                    faculty: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

module.exports = {
    createResource,
    getAllResources,
    updateResource,
    deleteResource,
    viewOneResourceById,
    searchResource
};