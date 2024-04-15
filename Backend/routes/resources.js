const router = require("express").Router();

const {
    createResource,
    getAllResources,
    updateResource,
    deleteResource,
    viewOneResourceById,
    searchResource
} = require('../controllers/resouceController');

//create new resource
router.post("/add", createResource);

//view all resources
router.get("/", getAllResources);

//update a resource by id
router.put("/update/:id", updateResource);

//delete resource by id
router.delete("/delete/:id", deleteResource);

//view one specific resource by id
router.get("/get/:id", viewOneResourceById);

//search resource
router.get("/search/:key", searchResource);

module.exports = router;