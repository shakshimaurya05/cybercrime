export default function Gallery() {
  const images = [
    {
      src: "https://static.pib.gov.in/WriteReadData/userfiles/image/L1P26UYR.jpeg",
      title: "National Cyber Security Conference",
      desc: "Providing VAPT & SOC consultation to leading authorities."
    },
    {
      src: "https://static.pib.gov.in/WriteReadData/userfiles/image/L1P1ODLY.JPG",
      title: "VAPT Deployment",
      desc: "On-site vulnerability assessment & penetration testing."
    },
    {
      src: "https://www.frankleisureandevents.com/images/service/corporate-conference.jpg",
      title: "SOC Monitoring Center",
      desc: "24/7 Security Operations Center monitoring."
    },
    {
      src: "https://www.frankleisureandevents.com/images/service/facility-and-activity.jpg",
      title: "Cyber Investigation",
      desc: "Digital forensics & intelligence operations."
    }
  ];

  return (
    <div className="w-full h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth bg-black">
      
      <div className="flex h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-screen flex-shrink-0 snap-start"
          >
            {/* Image */}
            <img
              src={`${img.src}?auto=format&fit=crop&w=1600&q=80`}
              alt={img.title}
              className="w-full h-full object-cover brightness-50"
            />

            {index === 0 && (
              <div className="absolute top-1/2 left-12 -translate-y-1/2 
                              bg-black/40 backdrop-blur-md p-12 
                              border-l-4 border-red-600 
                              max-w-xl text-white">
                
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                  {img.title}
                </h1>

                <p className="text-lg text-gray-300">
                  {img.desc}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
