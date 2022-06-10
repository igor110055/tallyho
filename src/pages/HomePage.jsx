import { useState } from "react";
import {
  FarmSection,
  FeaturesSection,
  InfoSection,
  Intro,
} from "../containers";
import AprModal from "../components/shared/AprModal";

const HomePage = () => {
  const [aprModalOpen, setAprModalOpen] = useState(false);
  const [aprModalVal, setAprModalVal] = useState(undefined);

  return (
    <main>
      <Intro />
      <section className="bg-primary-background">
        <FarmSection
          showAprModal={setAprModalOpen}
          setAprModalValue={setAprModalVal}
        />
        <FeaturesSection />
        <InfoSection />
      </section>
      <AprModal
        open={aprModalOpen}
        setOpen={setAprModalOpen}
        aprValue={aprModalVal}
      />
    </main>
  );
};

export default HomePage;
