import { useState, useEffect } from 'react';
import { useUserAuthCtx } from "../context/UserAuth";
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/posts';

const Homepage = () => {
  const user = useUserAuthCtx();
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['posts'], queryFn: getAllPosts });

 
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <>
      <h1 className="">Homepage</h1>
      { !user ? (
        <p>The user is not logged in.</p>
      ) : (
        <p>The user is logged in.</p>
      )}
      <br />
      { data.data.map( (post: { _id: string, title: string, content: string, creator: { first_name: string, last_name: string } }) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{`${post.creator.first_name} ${post.creator.last_name}`}</p>
            <p>{post.content}</p>
          </div>
        )
      })}
    </>
  );
}

export default Homepage;