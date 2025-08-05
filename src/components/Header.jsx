import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react'; 
import axios from "axios";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userPresent, setUserPresent] = useState(false);
    const [user, setUser] = useState('user');
    const navigate = useNavigate();

    const menuItems = [
        { title: 'Home', href: '/' },
        { title: 'Marketplace', href: '/marketplace' },
        { title: 'About Us', href: '/about-us' },
        { title: 'Contact', href: '/contact-us' },
    ];

    const signinClicked = () => {
        navigate('/sign-in');
    }

    useEffect(() => {
        if (userPresent){
            setUserPresent(true);
        }
    },[userPresent]);

    const logoutClicked = async () => {
        try{
            let url = "https://business.osemen.com.ng/logout.php";

            const response = await axios.get(url, {
                headers: {
                    "Content-Type" : "application/json",
                },withCredentials: true
            })

            if (response.data.message === 'logged out'){
                setUserPresent(false);
            }else{
                setUserPresent(true);
            }
        }catch(err){
            console.log("Error retrieving session: ", err);
        }
    }

    async function getSession() {
        try{
            let url = "https://business.osemen.com.ng//user_session.php";

            const response = await axios.get(url, {
                headers: {
                    "Content-Type" : "application/json",
                },withCredentials: true
            })

            console.log(response.data);
        
            if (response.data.session !== ''){
                setUserPresent(true);

                if (response.data.role === 'admin'){
                    setUser('admin');
                }else{
                    setUser('user');
                }
            }else{
                setUserPresent(false);
            }
        }catch(err){
            console.log("Error retrieving session: ", err);
        }
    }

    getSession()
    return ( 
        <>
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">BusinessConnect</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                    <Link
                    key={item.title}
                    to={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                    {item.title}
                    </Link>
                ))}
                <Link to={"/admin-panel"} className={`block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors
                    ${user === 'admin' ? "" : "hidden"}
                    `}>Admin Panel</Link>
                <button onClick={signinClicked} className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors
                    ${userPresent ? "hidden" : ""}
                    `}>
                    Sign In
                </button>
                <button onClick={logoutClicked} className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors
                    ${userPresent ? "" : "hidden"}
                    `}>
                    Logout
                </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-600"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>
            </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                    <Link
                    key={item.title}
                    to={item.href}
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                    {item.title}
                    </Link>
                ))}
                <Link to={"/admin-panel"} className={`block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors
                    ${user === 'admin' ? "" : "hidden"}
                    `}>Admin Panel</Link>
                <button onClick={signinClicked} className={`w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors
                    ${userPresent ? "hidden" : ""}
                `}>
                    Sign In
                </button>
                <button onClick={logoutClicked} className={`w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors
                    ${userPresent ? "" : "hidden"}
                `}>
                    Logout
                </button>
                </div>
            </div>
            )}
        </nav>
        </>
     );
}
 
export default Header;