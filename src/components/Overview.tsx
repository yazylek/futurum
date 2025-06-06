import { Card, CardContent } from "@/components/ui/card";

type Props = {
  balance: number;
};

const Overview = ({ balance }: Props) => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-verdigris font-bold text-3xl">
          Campaign Management
        </h1>
        <p className="text-sm ">Create and manage your product campaigns</p>
      </div>
      <div className="">
        <Card className="bg-midnight-green">
          <CardContent>
            <p className="text-sm text-gray-500">Balance</p>
            <h3 className="text-2xl font-bold text-green-600">
              ${balance.toFixed(2)}
            </h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
