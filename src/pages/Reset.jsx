import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import ChangePassword from "../components/Reset";
import SubNav from "../components/SubNav";

function Reset() {
  return (
    <div>
      <SubNav />
      <AppNav />
      <ChangePassword/>
      <Footer />
    </div>
  );
}

export default Reset;
