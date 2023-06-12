import { useUserAuthCtx } from "../context/UserAuth";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';


const PostInput = () => {
  const user = useUserAuthCtx();

  return (
    <div className='border flex'>
      <img src='https://picsum.photos/40' className='rounded-md mx-2 w-[40px] h-[40px]' />
      <textarea
        className='resize-none mx-2 rounded-md w-10/12 outline-none' 
        placeholder={
          !user
            ? "Sign in to speak your mind."
            : `What's new, ${user.first_name}`
        }
      />
      <button type="button" className="flex items-center bg-primary text-white w-36 mx-2 my-1 justify-center rounded-lg gap-4 font-semibold"><PaperAirplaneIcon className="w-6 h-6 "/>Post It!</button>
    </div>
  );
};

export default PostInput;
