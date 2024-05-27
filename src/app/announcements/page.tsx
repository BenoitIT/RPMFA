import FilterButton from "../(components)/buttons/FilterButton";
import AnnouncementCard from "../(components)/cards/AnnouncementCard";
import Footer from "../(components)/navigations/Footer";
import NavBar from "../(components)/navigations/NavBar";
import AnnouncementContents from "./(contents)/AnnouncementContents";

const Announcements =async() => {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/announcements`, {
    cache: "no-store",
  });
  const data = await response.json();
  if(data.status==200){
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mb-5">
        <NavBar />
         <AnnouncementContents announcements={data.announcements}/>
      </div>
      <Footer />
    </>
  );
}
};

export default Announcements;
