import CampaignsTable from "./CampaignsTable";
import NewCampaign from "./NewCampaign";
import { Card, CardContent } from "./ui/card";
import type { Campaign } from "@/App";

type Props = {
  campaigns: Campaign[];
  onAddCampaign: (campaign: Campaign) => void;
  onDeleteCampaign: (id: string) => void;
  onUpdateCampaign: (campaign: Campaign) => void;
};

const YourCampaigns = ({
  campaigns,
  onAddCampaign,
  onDeleteCampaign,
  onUpdateCampaign,
}: Props) => {
  return (
    <Card className="flex flex-col">
      <CardContent>
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold">Your Campaigns</h2>
            <p className="text-sm text-gray-500">
              Manage your active and inactive campaigns
            </p>
          </div>
          <NewCampaign onAddCampaign={onAddCampaign} />
        </div>
        <CampaignsTable
          campaigns={campaigns}
          onDeleteCampaign={onDeleteCampaign}
          onUpdateCampaign={onUpdateCampaign}
        />
      </CardContent>
    </Card>
  );
};

export default YourCampaigns;
