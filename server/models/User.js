const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must use a valid email address'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ],
  likes: [ { type: Schema.Types.ObjectId, ref: 'Post' } ],
  comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
  following: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  followers: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Retrieving the number of posts a user has created
userSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Retrieving the number of accounts a user is following
userSchema.virtual('followingCount').get(function() {
  return this.following.length;
});

// Retrieving the number of followers a user has
userSchema.virtual('followerCount').get(function() {
  return this.followers.length;
});

const User = model('User', userSchema);

module.exports = User;