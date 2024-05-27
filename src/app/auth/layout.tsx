import Footer from "../(components)/navigations/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
