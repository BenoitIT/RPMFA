import FilterButton from "../(components)/buttons/FilterButton";
import AnnouncementCard from "../(components)/cards/AnnouncementCard";
import Footer from "../(components)/navigations/Footer";
import NavBar from "../(components)/navigations/NavBar";

const Announcements = () => {
  const announcements = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mb-5">
        <NavBar />
        <div className="flex justify-between my-8 gap-y-3 max-sm:flex-col">
          <h1 className="text-3xl font-semibold text-blue-1">Announcements</h1>
          <div className="flex gap-3">
            <input
              type="date"
              name="date"
              id="date"
              className="border border-gray-200 rounded-lg p-2 w-50"
            />
            <FilterButton btnText="Filter by" />
          </div>
        </div>
        <div className="grid gap-8 my-6 border border-gray-150 p-7 max-sm:p-1 rounded-md">
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcements;
