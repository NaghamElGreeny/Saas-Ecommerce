import React from 'react'
import ThemeSwitchButton from './ThemeSwitchButton';
import ToggleIcon from '../icons/ToggleIcon';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../stores/themeConfigSlice';

const ToggleSidebarButton = () => {
    const dispatch = useDispatch();
  return (
    <ThemeSwitchButton
        action={() => {
            dispatch(toggleSidebar());
        }}
    >
        <ToggleIcon />
    </ThemeSwitchButton>
  )
}

export default ToggleSidebarButton
