import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
}

export const WidgetCard = ({ title, children }: WidgetCardProps) => (
  <Card className="rounded-2xl shadow-md">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
