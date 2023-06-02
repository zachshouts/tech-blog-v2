import { useUserAuthCtx } from "../context/UserAuth";

const Homepage = () => {
  const user = useUserAuthCtx();
  return (
    <>
      <h1 className="">Homepage</h1>
      { !user ? (
        <p>The user is not logged in.</p>
      ) : (
        <p>The user is logged in.</p>
      )}
    </>
  );
}

export default Homepage;