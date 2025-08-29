import userModel from "../models/user.model.js";

/** 
* Function to create a new user in the database.
*/
export async function createUser(data){
    return await userModel.create(data);
}

export async function findUser(query) {
    return await userModel.find(query);
}

export async function findOneUser(query) {
    return await userModel.findOne(query);
}