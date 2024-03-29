import {useAuth0} from "@auth0/auth0-react";
import {Icon} from "@iconify/react/dist/iconify.js";

export default function Profile() {
  const {user} = useAuth0();

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const monthNames = [
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="custom-container px-32 mx-auto pt-20 pb-8 sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:items-center gap-4 text-center sm:text-left">
          <img
            className="w-40 h-auto mx-auto rounded-full"
            src={user?.picture}
            alt={user?.name}
          />
          <div className="">
            <div className="text-white text-4xl">{user?.name}</div>
            <div className="text-md text-gray-400 mt-1">
              Lid geworden opp {formatDate(user?.updated_at)}
            </div>
          </div>
        </div>
        <div>
          <button className="bg-secondary text-white px-6 py-2 rounded-md flex items-center mt-5 sm:mt-0 mx-auto">
            <Icon
              className="text-white mr-2"
              icon="lucide:edit"
              width="24"
              height="24"
            />
            Profiel bewerken
          </button>
        </div>
      </div>
      <div className="custom-container mx-auto px-32">
        <div className="border-b-2 border-purple-400 border-opacity-10"></div>
      </div>

      <div className="pt-8 custom-container mx-auto px-32 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-md text-white bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={user?.given_name}
              readOnly
            />
            <label className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Voornaam
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-md text-white bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={user?.family_name}
              readOnly
            />
            <label className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Achternaam
            </label>
          </div>

          <div className="relative col-span-full lg:col-auto">
            <input
              type="date"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-md text-white bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={user?.birthdate}
              readOnly
            />
            <label className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Geboortedatum
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 py-6">
          <div className="relative">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-t-lg px-2.5 pb-2.5 pt-6 w-full text-md text-white bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={user?.email}
              readOnly
            />
            <label className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Email
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
