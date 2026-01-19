import { Badge } from "@/components/ui/badge";

export const RoleBadge = ({ role = "User" }) => {
    const isAdmin = role.toLowerCase() === "admin";

    return (
        <Badge
            className={
                isAdmin
                    ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            }
            variant="outline"
        >
            {role}
        </Badge>
    );
};
