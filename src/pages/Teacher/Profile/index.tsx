import { FaUser } from "react-icons/fa";
import "./index.css";

export default function TeacherProfile() {

  return (
    <section id="teacherProfile">
      <article>
        <form>
          <span>
            <FaUser/>
          </span>
          <aside>
            <span>
              <label htmlFor="name">Nome</label>
              <input placeholder="Entre com o seu nome" name="name" required />
            </span>

            <span>
              <label htmlFor="Sobrenome">Sobrenome</label>
              <input
                placeholder="Entre com o seu Sobrenome"
                name="Sobrenome"
                required
              />
            </span>

            <span>
              <label htmlFor="email">Emial</label>
              <input
                placeholder="Entre com o seu email"
                type="email"
                name="email"
                required
              />
            </span>
            <span>
              <label htmlFor="tel">Telefone</label>
              <input
                placeholder="Entre com o seu telefone"
                type="tel"
                name="tel"
                required
              />
            </span>
            <span>
              <label htmlFor="pass">Nova senha</label>
              <input
                placeholder="Entre com o sua nova senha (opcional)"
                type="password"
                name="pass"
              />
            </span>

            <span>
              <label htmlFor="password">Senha</label>
              <input
                placeholder="Entre com o sua senha"
                type="password"
                required
                name="password"
              />
            </span>
          </aside>
          <button>Actualizar</button>
        </form>
      </article>
    </section>
  );
}
