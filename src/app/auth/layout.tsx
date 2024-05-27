import Footer from "../(components)/navigations/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen">
      {children}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
