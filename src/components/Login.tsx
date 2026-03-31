import { GOOGLE_OAUTH_URI } from "@/constants/auth";

const Login = (): React.JSX.Element => {
  return (
    <div className="flex items-center flex-col gap-10 lg:gap-14 border border-slate-200 p-10 md:p-14 lg:p-20 rounded-xl">
      <h1 className="text-3xl lg:text-5xl text-(--technogise-blue) font-bold">EasyLeave</h1>

      <a
        href={GOOGLE_OAUTH_URI}
        className="flex items-center gap-4 border border-slate-300 rounded-lg px-6 py-3 cursor-pointer"
      >
        <img src="GoogleLogo.png" alt="Google Logo" className="w-4 md:w-5" />
        <span className="md:text-lg">Sign in with Google</span>
      </a>
    </div>
  );
};

export default Login;
