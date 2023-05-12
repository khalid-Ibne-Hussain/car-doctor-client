import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'

const About = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2  relative'>
                    <img src={person} className="w-4/5 rounded-lg shadow-2xl" />
                    <img src={parts} className="w-2/4 rounded-lg shadow-2xl absolute right-10 top-1/2 border-8 border-white" />
                </div>
                <div className='lg:w-1/2 p-4'>
                    <h3 className='text-3xl text-orange-500 font-bold mb-5'>About Us</h3>
                    <h1 className="text-5xl font-bold mb-7">We are qualified <br />& of experience <br />in this field</h1>
                    <p className="mb-5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
                    <p className="mb-7">the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
                    <button className="btn bg-orange-500">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;