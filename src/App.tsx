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
      location: "Kraków",
      radius: "25",
    },
    {
      id: "2",
      name: "Fashion Week Promotion",
      tags: ["fashion", "jewelry"],
      bidAmount: "1.75",
      fund: "300",
      status: false,
      location: "Łódź",
      radius: "15",
    },
    {
      id: "3",
      name: "Back to School Deals",
      tags: ["stationery", "backpack"],
      bidAmount: "1.25",
      fund: "200",
      status: true,
      location: "Kraków",
      radius: "10",
    },
    {
      id: "4",
      name: "Winter Jacket Launch",
      tags: ["fashion", "jacket"],
      bidAmount: "2.00",
      fund: "450",
      status: true,
      location: "Warszawa",
      radius: "20",
    },
    {
      id: "5",
      name: "Gaming Accessories Promo",
      tags: ["electronics", "gaming"],
      bidAmount: "3.00",
      fund: "600",
      status: false,
      location: "Gdańsk",
      radius: "30",
    },
    {
      id: "6",
      name: "Spring Beauty Campaign",
      tags: ["beauty", "skincare"],
      bidAmount: "1.50",
      fund: "350",
      status: true,
      location: "Poznań",
      radius: "25",
    },
    {
      id: "7",
      name: "Laptop Clearance Sale",
      tags: ["electronics", "laptop"],
      bidAmount: "2.75",
      fund: "700",
      status: false,
      location: "Warszawa",
      radius: "40",
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
    <main className="md:max-w-[1000px] max-w-[350px] min-h-screen mx-auto mt-5 flex flex-col gap-12">
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
