import postModel from "../models/post.model.js"

export async function createPost(data) {

    const { mentions, url, caption, user } = data

    return await postModel.create({
        image: url,
        caption,
        user,
        mentions
    })

}


export async function getPosts(skip=0, limit=10) {

    const posts = await postModel
        .find()
        .sort({ createdAt: -1 }) // Sort by creation date, newest first
        .skip(skip)
        .limit(limit)
       

    return posts
}

