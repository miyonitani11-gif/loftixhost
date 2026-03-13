import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, Monitor, Smartphone } from "lucide-react";
import { isAdmin } from "@/lib/admin";

type UserEntry = {
  user_email: string;
  user_id: string;
  last_login: string;
  login_count: number;
  device: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("login_activity" as any)
        .select("*")
        .order("logged_in_at", { ascending: false });

      if (data) {
        const userMap = new Map<string, UserEntry>();
        (data as any[]).forEach((row: any) => {
          const existing = userMap.get(row.user_email);
          if (!existing) {
            userMap.set(row.user_email, {
              user_email: row.user_email,
              user_id: row.user_id,
              last_login: row.logged_in_at,
              login_count: 1,
              device: row.user_agent?.includes("Mobile") ? "Mobile" : "Desktop",
            });
          } else {
            existing.login_count++;
          }
        });
        setUsers(Array.from(userMap.values()));
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="glass-card glow-border overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-heading font-semibold text-lg">User Management</h2>
        <p className="text-sm text-muted-foreground">{users.length} registered users</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Logins</TableHead>
            <TableHead>Device</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.user_email}>
              <TableCell className="font-medium">{u.user_email}</TableCell>
              <TableCell>
                {isAdmin(u.user_email) ? (
                  <Badge className="bg-primary/20 text-primary border-primary/30">Admin</Badge>
                ) : (
                  <Badge variant="outline">User</Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(u.last_login).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>{u.login_count}</TableCell>
              <TableCell>
                {u.device === "Mobile" ? (
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
