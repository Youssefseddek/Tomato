import Growth from "../../../DB/model/growth.model.js";



// add a new Plant

export const addGrowthStage = async (req, res) => {
    try {
        console.log("req.file", req.file);
        
        const { tomatoType, plantingDate } = req.body;
        console.log("req", req.body);

        if (!tomatoType || !plantingDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (req.file) {
            const photo = req.file.destination + "/" + req.file.filename
            const plant = await Growth.create({ tomatoType, plantingDate, photo });
            return res.status(201).json({ message: "Plant created successfully", plant })
        }
        const plant = await Growth.create({ tomatoType, plantingDate });
        return res.status(201).json({ message: "Plant created successfully", plant });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });

    }
}

// update photo of a plant growth stage
export const updatePlantPhoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.file) {
            const photo = req.file.destination + "/" + req.file.filename;
            const plant = await Growth.findByIdAndUpdate(id, { photo }, { new: true });
            return res.status(200).json({ message: "Plant updated successfully", plant });
        }
        
        return res.status(400).json({ message: "No photo provided" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
}

// update plant status
export const updatePlantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const plant = await Growth.findByIdAndUpdate(id, { status }, { new: true });
        if (!plant) {
            return res.status(404).json({ message: "Plant not found" });
        }

        return res.status(200).json({ message: "Plant status updated successfully", plant });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
}


// get all plants
export const getPlants = async (req, res) => {
    try {
        const plants = await Growth.find({});
        if (!plants || plants.length === 0) {
            return res.status(404).json({ message: "No plants found" });
        }
        return res.json({ message: "Plants retrieved successfully", plants });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
}


// get plant by id
export const getPlantById = async (req, res) => {
    try {
        const { id } = req.params;
        const plant = await Growth.findById(id);
        if (!plant) {
            return res.status(404).json({ message: "Plant not found" });
        }
        return res.json({ message: "Plant retrieved successfully", plant });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
}