import { Badge } from "@/components/ui/badge";

export const AnalyticsCard = ({ title, value, icon: Icon, change, trend = "neutral", className = "" }) => {
    const isPositive = trend === "up";
    const isNegative = trend === "down";

    return (
        <div className={`bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                {change && (
                    <Badge
                        variant="secondary"
                        className={
                            isPositive
                                ? "text-success bg-success/10"
                                : isNegative
                                    ? "text-destructive bg-destructive/10"
                                    : "text-muted-foreground bg-muted"
                        }
                    >
                        {change}
                    </Badge>
                )}
            </div>
            <div>
                <p className="text-3xl font-bold mb-1">{value}</p>
                <p className="text-sm text-muted-foreground">{title}</p>
            </div>
        </div>
    );
};
