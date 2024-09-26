import { User, userAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Bell, BellDot } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { notificationStore } from "@/store/notificationStore";
import axios from "axios";
import { API_URL } from "@/conf/ApiUrl";
import { Badge } from "../ui/badge";

const Notifications = ({ user }: { user: User }) => {
  const { getAllNotifications, notifications = [] } = notificationStore();
  useEffect(() => {
    getAllNotifications(user?.id || "");
  }, [user.id]);
  const clearNotifications = async()=>{
    const {token} = userAuthStore.getState();
    try {
      await axios.delete(`${API_URL}/api/notifications/clear/${user.id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          {notifications?.length ===0?(<Bell />):(<BellDot />)}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            {notifications?.length === 0 ? "No new notifications" : ""}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {notifications?.map((item) => (
            <div key={item.id} className="hover:bg-muted p-2 flex flex-col rounded-lg border">
              <Badge className="bg-slate-800 w-1/6 hover:bg-slate-800/90">new</Badge>
              {item.notification} {/* Render notification message */}
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {notifications?.length !== 0?<Button variant="destructive" onClick={()=>clearNotifications()}>clear</Button>:null}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
