import { Outlet, useLocation, useNavigate } from "react-router"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Book with Advisor", path: "/book-with-advisor" },
    { name: "Become an Advisor", path: "/become-advisor" },
    { name: "Workshops", path: "/workshops" },
    { name: "Donation", path: "/donation" },
  ]

  return (
    <>
      <div className="w-full py-8 px-4 bg-[#eaeaea] flex items-center justify-center">
        {navigation.map(nav => (
          <button
            className={
              "px-4 py-2 text-black rounded-md mr-4 font-light" +
              (location.pathname === nav.path
                ? " bg-white"
                : " hover:bg-gray-200 hover:shadow-md transition duration-100 hover:cursor-pointer")
            }
            onClick={() => navigate(nav.path)}
          >
            {nav.name}
          </button>
        ))}
      </div>
      <Outlet />
    </>
  )
}
