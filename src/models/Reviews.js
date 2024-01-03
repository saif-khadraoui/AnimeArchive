import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema({
    AnimeId: {
        type: String,
        require: true
    },
    Guest: {
        type: Boolean,
        require: true
    },
    Username: {
        type: String,
        require: true
    },
    UserId: {
        type: String,
        require: true
    },
    UserPic: {
        type: String,
        require: true
    },
    Rating: {
        type: Number,
        require: true
    },
    Content: {
        type: String,
        require: true
    },
})

const ReviewsModel = mongoose.models.reviews || mongoose.model('reviews', ReviewSchema);

export default ReviewsModel;