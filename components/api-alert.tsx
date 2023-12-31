"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  link: string;
  variant: "admin" | "public";
}

const ApiAlert: React.FC<ApiAlertProps> = ({ title, link, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
          {title}
          {variant === "admin" ? (
            <Badge variant="destructive">{variant}</Badge>
          ) : (
            <Badge variant="secondary">{variant}</Badge>
          )}
        </AlertTitle>
        <AlertDescription className="mt-3 flex items-center justify-between">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {link}
          </code>
          <Button variant="outline" size="icon" onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default ApiAlert;
