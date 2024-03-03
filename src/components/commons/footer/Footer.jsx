import {useNavigate} from "react-router-dom";


function Footer() {

    const navigate = useNavigate()

    return (
        <>
            <footer className="bg-purple text-white py-8 flex flex-col items-center
            md:flex-row md:justify-between md:px-12
            ">
                <p className="block md:hidden"><b>Gam'In-Spot</b></p>
                <p className="py-4 md:py-0 cursor-pointer" onClick={() => navigate('/legales')}>Mention légales</p>
                <p className="hidden md:block"><b>Gam'In-Spot</b></p>
                <p className='cursor-pointer' onClick={() => navigate('/conditions')}>Conditions d'utilisation</p>
            </footer>
        </>
    );
}

export default Footer