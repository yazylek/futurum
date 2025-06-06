import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import type { Campaign } from "@/App";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import EditCampaign from "./EditCampaign";

type Props = {
  campaigns: Campaign[];
  onDeleteCampaign: (id: string) => void;
  onUpdateCampaign: (campaign: Campaign) => void;
};

const CampaignsTable = ({
  campaigns,
  onDeleteCampaign,
  onUpdateCampaign,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Keywords</TableHead>
          <TableHead>Bid Amount</TableHead>
          <TableHead>Fund</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Radius</TableHead>
          <TableHead className="text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell className="flex flex-col gap-2">
              {campaign.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant={"outline"}>
                  {tag}
                </Badge>
              ))}
            </TableCell>
            <TableCell>${campaign.bidAmount}</TableCell>
            <TableCell>${campaign.fund}</TableCell>
            <TableCell>
              <Badge variant={campaign.status ? "default" : "outline"}>
                {campaign.status ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>{campaign.location}</TableCell>
            <TableCell>{campaign.radius}</TableCell>
            <TableCell>
              <EditCampaign
                initialData={campaign}
                onUpdateCampaign={onUpdateCampaign}
              />

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"outline"} className="cursor-pointer">
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete campaign.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDeleteCampaign(campaign.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CampaignsTable;
