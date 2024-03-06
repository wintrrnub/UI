import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // เพิ่ม import Link
import { HiMiniShoppingCart } from "react-icons/hi2";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [searchInput, setSearchInput] = useState('');
  const items = [
    { brand: 'Brand 1', name: 'Product 1', price: '$100', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 2', name: 'Product 2', price: '$200', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 3', name: 'Product 3', price: '$300', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 4', name: 'Product 4', price: '$400', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 5', name: 'Product 5', price: '$500', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 6', name: 'Product 6', price: '$600', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 7', name: 'Product 7', price: '$700', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
    { brand: 'Brand 8', name: 'Product 8', price: '$800', image: 'https://static.vecteezy.com/system/resources/thumbnails/011/047/536/small_2x/smartphone-and-mobile-phone-free-png.png' },
  ];

  const filteredItems = items.filter(item => {
    return item.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <center>
        <label style={{ width: "500px", margin: "30px" }} className="input input-bordered flex items-center gap-2">
          <input type="text"  value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search by name..." className="grow" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <div style={{ padding: "20px" }}><br />
            Brand <br />
            <input style={{ width: "200px" }} type="text" placeholder='enter your brand' className="input input-bordered input-xs" /><br />
            <br />
            Price <br />
            <input placeholder='ราคาต่ำสุด' type="text" style={{ width: "97px", marginRight: "6px" }} className="input input-bordered input-xs" /><input placeholder='ราคาสูงสุด' type="text" style={{ width: "97px" }} className="input input-bordered input-xs" />
          </div>

          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", padding: "30px", width: "80%" }}>
          {filteredItems.map((item, index) => (
            <div key={index} style={{ padding: "30px", backgroundColor: "white", borderRadius: "20px", margin: "35px", width: "320px", height: "450px", boxShadow: "black 0px 0px 4px" }}><br />
              Brand: {item.brand} <br />
              <div style={{ width: "100%", height: "270px", padding: "10px" }}>
              <img src={item.image} alt="phone" className="rounded-xl" />
              </div>
              <div style={{ textAlign: "left" }}>
                <label htmlFor="">name : {item.name}</label><br /><br />
                <label htmlFor="">price : {item.price}</label>
                <button style={{ float: "right", fontSize: "30px" }}><HiMiniShoppingCart /></button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </center>
    </>
  );
}
