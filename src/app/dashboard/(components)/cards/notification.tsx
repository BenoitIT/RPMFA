import { HiOutlineBellAlert } from "react-icons/hi2";
interface NoticationProps {
  displayNotification: boolean;
  notifications: any[];
  handleMarkAsRead: (val: number) => void;
}
const Notifcations = ({
  displayNotification,
  notifications,
  handleMarkAsRead,
}: NoticationProps) => {
  return (
    <div
      className={
        displayNotification
          ? "md:w-[400px] w-[320px] bg-white shadow rounded-lg shadow-lightblue py-2 px-3 z-50 absolute top-[56px] lg:right-[52px] right-[10px] border border-lightblue flex flex-col gap-2"
          : "hidden"
      }
    >
      <p className="text-gray-700 font-semibold text-sm">Notifications</p>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <p
            className="text-xs p-2 bg-gray-50 rounded font-light opacity-95 cursor-default flex gap-2 relative w-full"
            key={notification?.id}
          >
            <HiOutlineBellAlert className="mt-[1px]" />
            <span className="w-3/4">{notification.notification}</span>
            <span
              className="font-medium absolute right-1 top-1 hover:cursor-pointer"
              onClick={() => handleMarkAsRead(notification.id)}
            >
              Mark as read
            </span>
          </p>
        ))
      ) : (
        <p className="text-xs p-2  rounded font-light opacity-95 cursor-default flex gap-2 relative w-full">
            <HiOutlineBellAlert className="mt-[1px]" />
          <span>No notification found..</span>
        </p>
      )}
    </div>
  );
};
export default Notifcations;