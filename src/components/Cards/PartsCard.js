import React,{useState} from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { MenuIcon } from '../../icons';
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext,Button } from '@windmill/react-ui'



function PartsCard(props) {

  const {title,children} = {...props};
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)


  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  return (
    <Card>
    <div className="relative mr-10">
<Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
              
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Full Screen</span>
                {/* <Badge type="danger">133</Badge> */}
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Info</span>
                {/* <Badge type="danger">2</Badge> */}
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between" >
                <span>More...</span>
              </DropdownItem>
</Dropdown>
</div>
    <CardBody>
      <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{title}
      <span className='text-right float-right'>
      {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
</svg> */}
<Button icon={MenuIcon} layout="link" aria-label="Like" onClick={handleNotificationsClick} />


</span>
</p>
      <p className="text-gray-600 dark:text-gray-400">
      {children}
      </p>
    </CardBody>
  </Card>
  )
}

export default PartsCard
