import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { _id, title, img, price } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-8 pt-8">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-2xl">{title}</h2>
                <div className="card-actions flex justify-between items-center">
                    <p className="text-2xl font-semibold">Price: <span className="text-orange-500">${price}</span></p>
                    <Link to={`/book/${_id}`}>
                        <button> <FaArrowRight className="text-xl text-orange-500" /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;