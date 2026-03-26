import {NavBar} from '../organism/NavBar'
export default function TemplateCharacters({ children }) {
  return (
    <div>
      <NavBar/>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}