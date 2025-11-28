import { Clock, Leaf, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { ScanResult } from "@/pages/Index";

interface ScanHistoryProps {
  history: ScanResult[];
  onRefresh?: () => void;
  onClearAll?: () => void;
}

const ScanHistory = ({ history, onRefresh, onClearAll }: ScanHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card className="p-6 border-2 border-border">
        <div className="flex flex-col items-center justify-center text-center space-y-3 py-8">
          <div className="rounded-full bg-muted p-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">কোনো স্ক্যান ইতিহাস নেই</h3>
            <p className="text-sm text-muted-foreground">
              আপনার সাম্প্রতিক স্ক্যান এখানে প্রদর্শিত হবে
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">সাম্প্রতিক স্ক্যান</h3>
        </div>
        {onClearAll && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>সব স্ক্যান মুছে ফেলবেন?</AlertDialogTitle>
                <AlertDialogDescription>
                  এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। এটি স্থায়ীভাবে আপনার সমস্ত স্ক্যান ইতিহাস মুছে ফেলবে।
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>বাতিল</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClearAll}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  মুছে ফেলুন
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      <div className="space-y-3">
        {history.map((scan) => (
          <div
            key={scan.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <img
              src={scan.image_url}
              alt="Scanned crop"
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge 
                  variant={scan.status === "fresh" ? "default" : "destructive"}
                  className={scan.status === "fresh" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}
                >
                  {scan.status === "fresh" ? "সতেজ" : "পচা"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {scan.confidence.toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {scan.timestamp.toLocaleString("bn-BD")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ScanHistory;
