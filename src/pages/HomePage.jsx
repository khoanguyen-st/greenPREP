import { Layout } from "antd";
import EnterSessionKey from "@features/welcome/ui/EnterSessionKey";
import SharedHeader from "@shared/ui/SharedHeader";

const HomePage = () => {
  return (
    <Layout className="min-h-screen">
      <SharedHeader />
      <EnterSessionKey />
    </Layout>
  );
};

export default HomePage;
