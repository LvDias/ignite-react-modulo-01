import styles from './Header.module.css'

import iconRocketLogo from '../assets/icon-rocket-logo.png' 

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={iconRocketLogo} />
      <h1 className={styles.title}>todo</h1>
    </header>
  )
}