const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
  likes: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Retrieving the number of likes on a post
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Retrieving the number of comments on a post
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;