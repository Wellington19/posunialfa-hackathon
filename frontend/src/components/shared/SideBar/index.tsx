import React from 'react'
import Link from 'next/link'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { FaHome, FaAddressBook } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { useSideBarContext } from '@contexts/SideBarContext'
import { useAuthContext } from '@contexts/AuthContext'

export function Sidebar() {
  const { user, signOut } = useAuthContext()
  const { isOpen } = useSideBarContext()

  return (
    <ProSidebar collapsed={!isOpen}>
      <SidebarHeader>
        <Menu iconShape="square">
          <Link href="/home" passHref>
            <MenuItem icon={<FaHome />}>Início</MenuItem>
          </Link>
        </Menu>
      </SidebarHeader>

      <SidebarContent>
        {user?.profile !== 'Aluno' && (
          <Menu iconShape="square">
            <SubMenu title="Cadastros" icon={<FaAddressBook />}>
              <Link href="/cadastros/usuarios" passHref>
                <MenuItem>Usuários</MenuItem>
              </Link>
            </SubMenu>
          </Menu>
        )}
      </SidebarContent>

      <SidebarFooter>
        <Menu iconShape="square">
          <MenuItem icon={<ImExit />} onClick={signOut}>
            Sair
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  )
}
