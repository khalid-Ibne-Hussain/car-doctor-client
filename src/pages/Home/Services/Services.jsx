import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://car-doctor-server-gamma.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl text-orange-500 font-semibold">Service</h3>
                <h2 className="text-5xl font-bold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}>

                    </ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;