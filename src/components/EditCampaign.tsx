import type { Campaign } from "@/App";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import SimpleTypeahead from "./SimpleTypeahead";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  initialData: Campaign;
  onUpdateCampaign: (campaign: Campaign) => void;
};

const EditCampaign = ({ initialData, onUpdateCampaign }: Props) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [status, setStatus] = useState(false);
  const [tags, setTags] = useState<string[]>(initialData.tags);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedCampaign: Campaign = {
      id: initialData.id,
      name: formData.get("name") as string,
      tags: tags,
      bidAmount: formData.get("bidAmount") as string,
      fund: formData.get("campaignFund") as string,
      status: status,
      location: location,
      radius: formData.get("radius") as string,
    };

    onUpdateCampaign(updatedCampaign);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-4 rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" defaultValue={initialData.name} required />
          <SimpleTypeahead
            selected={tags}
            onChange={setTags}
            suggestions={["electronics", "fashion", "smartphone", "beauty"]}
          />
          <Input
            name="bidAmount"
            type="number"
            step="0.01"
            defaultValue={initialData.bidAmount}
            required
          />
          <Input
            name="campaignFund"
            type="number"
            step="0.01"
            defaultValue={initialData.fund}
            required
          />
          <div>
            <Select
              onValueChange={setLocation}
              defaultValue={location}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a town" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Towns</SelectLabel>
                  <SelectItem value="Kraków">Kraków</SelectItem>
                  <SelectItem value="Poznań">Poznań</SelectItem>
                  <SelectItem value="Łódź">Łódź</SelectItem>
                  <SelectItem value="Warszawa">Warszawa</SelectItem>
                  <SelectItem value="Gdańsk">Gdańsk</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Input
            name="radius"
            type="number"
            defaultValue={initialData.radius}
            required
          />
          <div>
            <Label htmlFor="status">Is Active?</Label>
            <Switch checked={status} onCheckedChange={setStatus} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaign;
