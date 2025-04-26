import P1 from '../assets/productImg/p1.png'
import P2 from '../assets/productImg/p2.png'
import P3 from '../assets/productImg/p3.png'
import P4 from '../assets/productImg/p4.png'
import P5 from '../assets/productImg/p5.png'
import P6 from '../assets/productImg/p6.png'
import P7 from '../assets/productImg/p7.png'
import P8 from '../assets/productImg/p8.png'

export const links = [
  { id: 1, url: '/', text: 'Home' },
  { id: 2, url: '/about', text: 'about' },
  { id: 3, url: '/products', text: 'products' },
  { id: 4, url: '/orders', text: 'orders' },
  { id: 5, url: '/NewArrival', text: 'NewArrival' },
  { id: 6, url: '/Brands', text: 'Brands' },
]
export const Products = [
  {
    id: 1,
    name: 'Classic Black T-shirt',
    price: 89.99,
    rating: 4.8,
    image: P5,
    soldCount: '1.2k',
    size: 's',
  },
  {
    id: 2,
    name: 'Premium Denim Jeans',
    price: 199.99,
    oldPrice: 249.99,
    discount: '20%',
    rating: 4.7,
    image: P6,
    soldCount: '950',
    size: 'l',
  },
  {
    id: 3,
    name: 'Casual Plaid Shirt',
    price: 129.99,
    rating: 4.6,
    image: P7,
    soldCount: '800',
    size: 'm',
  },
  {
    id: 4,
    name: 'Sport Raglan Tee',
    price: 79.99,
    oldPrice: 99.99,
    discount: '20%',
    rating: 4.9,
    image: P8,
    soldCount: '1.5k',
    size: 'xl',
  },
  {
    id: 5,
    name: 'black pants',
    price: 100.0,
    oldPrice: 105.22,
    discount: '20%',
    rating: 4.9,
    image: P8,
    soldCount: '1.5k',
    size: '2xl',
  },
]
