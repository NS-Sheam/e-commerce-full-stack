import googleIcon from "../../assets/icons/google.png";

const GoogleLoginButton = () => {
  return (
    <div
      style={{ border: "1px solid #E4E7E9" }}
      className="w-full py-2 rounded-md flex justify-between items-center shadow-lg my-4 border-black px-3 cursor-pointer"
    >
      <img
        src={googleIcon}
        alt="google icon"
        className="w-7 h-7"
      />
      <p className="flex-1 text-center font-semibold">Sign in with Google</p>
    </div>
  );
};

export default GoogleLoginButton;
