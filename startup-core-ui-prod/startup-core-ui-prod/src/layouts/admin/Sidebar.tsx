import { useAcl } from 'features/profile';
import {
  HiChevronDown,
  HiChevronRight,
  HiDatabase,
  HiDocumentSearch,
  HiHome,
  HiNewspaper,
  HiOfficeBuilding,
  HiPencilAlt,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';
import { Route, Routes } from 'react-router-dom';
import { SidebarItem } from 'ui/components';

// type Props = {}

const trailingIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <HiChevronDown className="h-5 w-5" />
  ) : (
    <HiChevronRight className="h-5 w-5" />
  );

const SidebarSubGroup = ({
  path,
  children,
  collapse = false,
}: {
  path: string;
  children: React.ReactNode;
  collapse?: boolean;
}) => {
  if (!collapse) return <div>{children}</div>;
  return (
    <Routes>
      <Route path={path} element={<div>{children}</div>} />
    </Routes>
  );
};

function Sidebar() {
  const { acl } = useAcl();
  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col">
          <SidebarItem
            leadingIcon={<HiHome />}
            to="/home"
            acl={acl('ALL_ACCESS')}
          >
            Dashboard
          </SidebarItem>

          <SidebarItem
            leadingIcon={<HiOfficeBuilding />}
            to="/startup"
            trailingIcon={trailingIcon}
            end
            acl={acl(['startups-view'])}
          >
            Startups
          </SidebarItem>
          <SidebarSubGroup path="/startup/*" collapse>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/startup/list"
              acl={acl(['startups-view'])}
            >
              List
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/startup/for-verification"
              acl={acl(['startups-view'])}
            >
              For Verification
            </SidebarItem>
          </SidebarSubGroup>

          <SidebarItem
            leadingIcon={<HiNewspaper />}
            to="/program"
            trailingIcon={trailingIcon}
            end
            acl={acl(['programs-view'])}
          >
            Programs
          </SidebarItem>
          <SidebarSubGroup path="/program/*" collapse>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/program/list"
              acl={acl(['programs-view'])}
            >
              List
            </SidebarItem>
          </SidebarSubGroup>

          <SidebarItem
            leadingIcon={<HiPencilAlt />}
            to="/cms"
            trailingIcon={trailingIcon}
            end
            acl={acl([
              'news-view',
              'requirements-view',
              'datasets-view',
              'assessment-tags-view',
            ])}
          >
            Content Management
          </SidebarItem>
          <SidebarSubGroup path="/cms/*" collapse>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/cms/news"
              acl={acl(['news-view'])}
            >
              News
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/cms/resources"
              acl={acl(['resources-view'])}
            >
              Resources
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/cms/requirements"
              acl={acl(['requirements-view'])}
            >
              Requirements
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/cms/dataset"
              acl={acl(['datasets-view'])}
            >
              Datasets
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/cms/assessment-tags"
              acl={acl(['assessment-tags-view'])}
            >
              Assessment Tags
            </SidebarItem>
          </SidebarSubGroup>

          <SidebarItem
            leadingIcon={<HiDocumentSearch />}
            to="/logs"
            acl={acl('audits-view')}
          >
            Audit Logs
          </SidebarItem>

          <SidebarItem
            leadingIcon={<HiUserGroup />}
            to="/access-control"
            trailingIcon={trailingIcon}
            end
            acl={acl(['administrators-view', 'roles-view'])}
          >
            Access Control
          </SidebarItem>

          <SidebarSubGroup path="/access-control/*" collapse>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/access-control/users"
              acl={acl(['administrators-view'])}
            >
              Users
            </SidebarItem>
            <SidebarItem
              leadingIcon={<div className="w-4" />}
              to="/access-control/roles"
              acl={acl(['roles-view'])}
            >
              Roles
            </SidebarItem>
          </SidebarSubGroup>
        </div>
      </div>
      <div className="mt-auto px-6 pb-4">
        <div className="text-xs">Admin Portal v1.0</div>
      </div>
    </>
  );
}

export default Sidebar;
