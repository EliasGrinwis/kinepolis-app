import {LogoutOptions, useAuth0} from "@auth0/auth0-react";
import logo from "../assets/kinepolis_logo.png";
import {useState} from "react";
import {Icon} from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  const {isAuthenticated, user, loginWithRedirect, logout} = useAuth0();
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = (): void => {
    const logoutOptions: LogoutOptions = {
      returnTo: window.location.origin,
    } as any;
    logout(logoutOptions);
  };

  return (
    <nav className="bg-[#12182b] text-secondary text-lg font-bold sticky top-0 z-10">
      <div className="custom-container px-32 mx-auto flex items-center justify-between py-6">
        <a href="/">
          <img src={logo} alt="logo" className="w-12 h-auto cursor-pointer" />
        </a>
        <ul className="flex items-center gap-8">
          <li>
            <a href="/">Films</a>
          </li>
          {!isAuthenticated ? (
            <li>
              <a onClick={() => loginWithRedirect()} className="cursor-pointer">
                Inloggen
              </a>
            </li>
          ) : (
            <li className="relative flex items-center gap-5">
              <img
                id="avatarButton"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.picture}
                alt="User dropdown"
                onClick={() => toggleDropdown()}
              />

              {dropdown && (
                <div className="absolute right-0 top-12 z-10 bg-primary shadow-lg divide-y divide-secondary rounded-lg outline-secondary outline outline-1 w-56">
                  <div className="px-4 py-3 text-sm text-secondary">
                    <div>{user?.name}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </div>
                  <ul
                    className="py-2 text-sm text-secondary"
                    aria-labelledby="avatarButton">
                    <li>
                      <a
                        href="/profile"
                        className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <Icon
                          className="text-secondary"
                          icon="pajamas:profile"
                          width="24"
                          height="24"
                        />
                        Profiel
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <Icon
                          className="text-secondary"
                          icon="material-symbols:movie"
                          width="24"
                          height="24"
                        />
                        Favoriete films
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <Icon
                          className="text-secondary"
                          icon="material-symbols:settings"
                          width="24"
                          height="24"
                        />
                        Instellingen
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      onClick={() => handleLogout()}
                      className="cursor-pointer px-3 py-2 text-sm text-secondary hover:bg-gray-100 flex items-center gap-2">
                      <Icon
                        className="text-secondary"
                        icon="uil:signout"
                        width="24"
                        height="24"
                      />
                      Uitloggen
                    </a>
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
