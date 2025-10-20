import { useProfile } from 'features/profile';
import { useRef } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownItem, Img } from 'ui/components';

// type Props = {}

function NavUserInfo() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const myDropdown = useRef<any>(null)
  return (
    <div>
      <div className="flex items-center space-x-3">
        <div>
          <Img
            className="h-7 w-7 rounded-md"
            src={profile.photo_url}
            alt={profile.name || 'User'}
          />
        </div>
        <div className="min-w-[102px]">
          <div className="text-xs font-bold text-primary-base">
            {profile.name}
          </div>
          <div className="text-xs">{profile.email}</div>
        </div>
        <div>
          {/* used smallest button variant instead of the custom size */}
          <Button
            size="xs"
            leadingIcon={<HiChevronDown />}
            onClick={() => myDropdown.current.setShow((v: boolean) => !v)}
          />
        </div>
      </div>
      <Dropdown ref={myDropdown}>
        <DropdownItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => navigate('/logout')}>Logout</DropdownItem>
      </Dropdown>
    </div>
  );
}

export default NavUserInfo;
