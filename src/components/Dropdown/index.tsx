import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './index.scss'
import { useRouter } from 'next/navigation';

interface MenuItem {
  label: string;
  action: string;
}

interface CustomDropdownProps {
  children: React.ReactNode;
  menuItems: MenuItem[]; // Lista de itens do menu
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ children, menuItems }) => {

  const router = useRouter();

  const handleItemClick = (action: string) => {
    switch (action) {
      case 'profile':
        router.push(`/profile/${children}`);
        break;
      case 'favorites':
        router.push(`/favorite-movies/${children}`);
        break;
      case 'login':
        router.push('/auth/login');
        break;
      case 'signup':
        router.push('/auth/signup');
        break;
      case 'logout':
        localStorage.removeItem('TOKEN_API_BACKEND');
        window.location.reload();
        window.location.href = '/'
        break;
      default:
        break;
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className='dropdown-toggle'>
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuItems.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handleItemClick(item.action)}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
