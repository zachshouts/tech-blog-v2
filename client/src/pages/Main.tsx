import { useState } from 'react';
import { useUserAuthCtx } from "../context/UserAuth";
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/posts';
import { PostInput } from '../components';

const Homepage = () => {
  const user = useUserAuthCtx();
  console.log(user);
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['posts'], queryFn: getAllPosts });

 
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <main className='flex'>
      <div className='border flex flex-col justify-center text-center mx-5 w-1/3' id='col-1'>
        <h1 className="w-full">Homepage</h1>
        { !user ? (
          <p className='w-full'>The user is not logged in.</p>
        ) : (
          <>
            <p>The user is logged in.</p>
            <p>{user.first_name}</p>
          </>
        )}

      </div>

      <div className='mx-5 w-2/3' id='col-2'>
        <PostInput />
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
      </div>
      
    </main>
  );
}

export default Homepage;