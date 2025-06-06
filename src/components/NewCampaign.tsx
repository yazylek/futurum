import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Campaign } from "@/App";
import { useState } from "react";
import SimpleTypeahead from "./SimpleTypeahead";
import { Switch } from "./ui/switch";

type Props = {
  onAddCampaign: (campaign: Campaign) => void;
};

const NewCampaign = ({ onAddCampaign }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const campaign: Campaign = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      tags: tags,
      bidAmount: formData.get("bidAmount") as string,
      fund: formData.get("campaignFund") as string,
      status: status,
      location: formData.get("town") as string,
      radius: formData.get("radius") as string,
    };

    onAddCampaign(campaign);
    form.reset(); // wyczyść formularz
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <span>+</span> Add Campaign
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new campaign</DialogTitle>
            <DialogDescription>
              Set up a new campaign for your product.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name">Campaign Name *</label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="keywords">Keywords *</Label>
              <SimpleTypeahead
                selected={tags}
                onChange={setTags}
                suggestions={[
                  "electronics",
                  "fashion",
                  "laptop",
                  "smartphone",
                  "beauty",
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="bidAmount">Bid Amount ($) *</Label>
                <Input
                  id="bidAmount"
                  name="bidAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="campaignFund">Campaign Fund ($) *</Label>
                <Input
                  id="campaignFund"
                  name="campaignFund"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="town">Town *</Label>
                <Input id="town" name="town" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="radius">Radius (km)*</Label>
                <Input
                  id="radius"
                  name="radius"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Is Active?</Label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaign;
