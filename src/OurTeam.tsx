import saraUrl from "./assets/images/Sara.png";
import sinaUrl from "./assets/images/Sina.jpeg";
import iliaUrl from "./assets/images/Leo.png";
import saharUrl from "./assets/images/Sahar.jpeg";
import mohsenUrl from "./assets/images/Mohsen.png";

function OurTeam() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
        </div>

        {/* Founders */}
        <h2 className="text-3xl font-semibold text-center mb-8">Founders</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center">
            <img
  src={saraUrl}
  alt="Sara Roozbahani"
  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
/>
            <h3 className="text-2xl font-semibold">Sara Roozbahani</h3>
            <p className="text-sky-600 mt-2">
              Founder & Executive Director
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-semibold">Sina Ansari Movahed</h3>
            <p className="text-sky-600 mt-2">
              Founder & Director of Operations & Technology
            </p>
          </div>
        </div>

        {/* Core Team */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          Core Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-semibold">Ilia Jafari</h3>
            <p className="text-sky-600 mt-2">
              Marketing & Outreach Coordinator
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-semibold">Mohsen</h3>
            <p className="text-sky-600 mt-2">
              Cybersecurity & Web Infrastructure Lead
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-semibold">Sahar</h3>
            <p className="text-sky-600 mt-2">
              Administration & Student Coordination
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OurTeam;