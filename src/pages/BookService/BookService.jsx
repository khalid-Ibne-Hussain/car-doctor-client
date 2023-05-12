import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'


const BookService = () => {
    const service = useLoaderData();
    // console.log(service);
    const { _id, title, price, img } = service;
    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        // send data to the server
        fetch('https://car-doctor-server-gamma.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Order Placed Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        position: 'top-end'
                    })
                }
            })
    }


    return (
        <div>
            <h2 className="text-center text-5xl">Book Service: {title}</h2>

            <div className=" p-5 md:p-14 lg:p-20 min-h-screen bg-base-200 rounded-xl grid mx-auto">
                <form onSubmit={handleBookService}>
                    <div className="card-body">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} placeholder="name" className="input input-bordered" name="name" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" className="input input-bordered" name="date" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input type="text" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due amount</span>
                                </label>
                                <input type="text" defaultValue={'$ ' + price} className="input input-bordered" />
                            </div>
                        </div>

                        <textarea className="border p-4" name="message" placeholder="message" id="" cols="50" rows="10"></textarea>

                        <div className="form-control mt-6">

                            <input className="btn btn-primary btn-block bg-orange-500" type="submit" value="Order Confirm" />
                        </div>
                    </div>
                </form>
            </div>





        </div>
    );
};

export default BookService;