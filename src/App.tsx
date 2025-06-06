import { useState } from "react";
import Overview from "./components/Overview";
import YourCampaigns from "./components/YourCampaigns";

export type Campaign = {
  id: string;
  name: string;
  tags: string[];
  bidAmount: string;
  fund: string;
  status: boolean;
  location: string;
  radius: string;
};

function App() {
  const [balance, setBalance] = useState(2500);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Electronics Sale",
      tags: ["electronics", "smartphone"],
      bidAmount: "2.5",
      fund: "500",
      status: true,
      location: "New York",
      radius: "25",
    },
    {
      id: "2",
      name: "Fashion Week Promotion",
      tags: ["fashion", "jewelry"],
      bidAmount: "1.75",
      fund: "300",
      status: false,
      location: "Los Angeles",
      radius: "15",
    },
  ]);

  const handleAddCampaign = (campaign: Campaign) => {
    const fundAsNumber = parseFloat(campaign.fund);
    if (fundAsNumber > balance) {
      alert("Insufficient balance");
      return;
    }

    setCampaigns((prev) => [...prev, campaign]);
    setBalance((prev) => prev - fundAsNumber);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateCampaign = (updated: Campaign) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <main className="max-w-[1000px] mx-auto mt-5 flex flex-col gap-12">
      <Overview balance={balance} />
      <YourCampaigns
        campaigns={campaigns}
        onAddCampaign={handleAddCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onUpdateCampaign={handleUpdateCampaign}
      />
    </main>
  );
}

export default App;
