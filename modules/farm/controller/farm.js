import Farm from "../../../DB/model/farm.model.js";
import Favorite from "../../../DB/model/favorites.model.js";


// get farms
export const getFarms = async (req, res) => {
    const farms = await Farm.find({})
    res.json({ message: "farms", farms });
}


// search farms by name
export const searchFarms = async (req, res) => {
    try {
        const { name } = req.query

        
        if (!name) {
            return res.status(400).json({ message: "Name is required" })
        }
        const farms = await Farm.find({ name: { "$regex": `${name}`,$options: "i"  }})
        if (farms.length === 0) {
            return res.status(404).json({ message: "No farms found" })
        }
        return res.json({ message: "Farms", farms });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}

// get farm by id
export const getFarmById = async (req, res) => {

    try {
        const { id } = req.params
        const farm = await Farm.findById(id)
        if (!farm) {
            return res.status(404).json({ message: "Farm not found" })
        }
        return res.json({ message: "Farm", farm });
    } catch (error) {

        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}



// ======================================== favorite farms ========================================

// favorite farm
export const favoriteFarm = async (req, res) => {
    try {
        const { id } = req.params
        const farm = await Farm.findById(id)
        if (!farm) {
            return res.status(404).json({ message: "Farm not found" })
        }
        const favorite = await Favorite.findOne({ farmId: id, userId: req.user._id })
        if (favorite) {
            return res.status(400).json({ message: "Farm already favorited" })
        }
        const newFavorite = await Favorite.create({ farmId: id, userId: req.user._id, createdAt: Date.now() })
        if (!newFavorite) {
            return res.status(500).json({ message: "fail to favorite farm" })
        }   
        return res.json({ message: "Farm favorited", favorite: newFavorite });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }

}

// unfavorite farm
export const unFavoriteFarm = async (req, res) => {
    try {
        const { id } = req.params
        const farm = await Farm.findById(id)
        if (!farm) {
            return res.status(404).json({ message: "Farm not found" })
        }
        const favorite = await Favorite.findOne({ farmId: id, userId: req.user._id })
        if (!favorite) {
            return res.status(400).json({ message: "Farm not favorited" })
        }
        const deletedFavorite = await Favorite.deleteOne({ farmId: id, userId: req.user._id })
        if (!deletedFavorite) {
            return res.status(500).json({ message: "error" })
        }   
        return res.json({ message: "Farm unfavorited", favorite: deletedFavorite });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }

}


// get favorite farms
export const getFavoriteFarms = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id })
        if (!favorites) {
            return res.status(404).json({ message: "No favorite farms found" })
        }
        const farmIds = favorites.map(favorite => favorite.farmId)
        const farms = await Farm.find({ _id: { $in: farmIds } })
        return res.json({ message: "Favorite farms", farms });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}


        



