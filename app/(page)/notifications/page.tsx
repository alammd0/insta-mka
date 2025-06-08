"use client";

import { getnotification } from "@/app/service/opreation/notificationsAPI";
import { formatDate } from "@/app/utils/data";
import { useEffect, useState } from "react";

type Notification = {
  sender: {
    name: string;
  };
  type: string;
  message: string;
  createdAt: string;
};

export default function NotificationPage() {
  const [notification, setNotification] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchnotification = async () => {
      try {
        const resp = await getnotification();

        if (resp) {
          setNotification(resp.data);
        } else {
          throw new Error("Error throw fetching the error..");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchnotification();
  }, []);

  console.log("Notification - ", notification);

  const formattedDates = notification.map((data): string => {
    return formatDate(data.createdAt);
  });

  return (
    <div
      className="bg-[#1E2939] w-[550px] text-white mb-4 px-2 py-4 rounded-xl border-1 border-fuchsia-600
     flex flex-col items-center"
    >
      <div className=" bg-fuchsia-400 w-full text-center py-2 rounded-xl">
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <div>
        {notification.length === 0 ? (
          <div>
            <h1>No Nofitification Found</h1>
          </div>
        ) : (
          <div>
            {notification.map((data, index) => (
              <div className="flex justify-between gap-12 bg-[#2d2b2b] m-4 px-4 py-3 rounded-xl" key={index}>
                <div>
                  <h2 className="text-xl font-semibold">{data.sender.name}</h2>
                  <p className="text-[14px] capitalize">{data.type}</p>
                </div>

                <div className=" capitalize">{data.message}</div>

                <div className="text-[13px] font-semibold text-gray-400">{formattedDates[0]}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
