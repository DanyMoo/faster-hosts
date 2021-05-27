import { Switch } from 'antd';
import React, { useState, useEffect } from 'react'
import useStorage from '../../hooks/useStorage';
import editorIcon from '../../images/editor.png'
import { USING_HOSTS_ID } from '../../../const'

import './style.css'

export interface MenuItem {
  title?: string;
  id?: string;
}

interface SideMenuProps {
  list: MenuItem[];
  id?: string;
  onChange?: (value: MenuItem) => void;
  onEditor?: (item?: MenuItem) => void;
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { list, id, onChange, onEditor } = props;

  const { storage: usingHostsId } = useStorage(USING_HOSTS_ID)

  const handleClick = (newValue?: MenuItem) => {
    if (id !== newValue?.id) {
      newValue && onChange?.(newValue)
    }
  }

  const handleEditor = (current: MenuItem) => {
    onEditor?.(current)
  }

  const handleUsingChange = (checked: boolean, item: MenuItem) => {
    const usingId = checked ? item.id : '_null_using_id_'
    chrome.storage.sync.set({ [USING_HOSTS_ID]: usingId })
  }

  useEffect(() => {

  }, [])

  return (
    <ul className="side_menu">
      {list.map(item => {
        const selected = id === item.id
        return (
          <li onClick={() => handleClick(item)} className={`${selected ? 'side_menu_item__selected' : null} side_menu_item`} key={item.id}>
            <span>{item.title}</span>
            <div>
              {selected && (
                <div>
                  <Switch checked={usingHostsId === item.id} onChange={(checked: boolean) => handleUsingChange(checked, item)} size="small" />
                  <img onClick={() => handleEditor(item)} className="side_menu_item_editor" src={editorIcon} alt="editor" />
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SideMenu
