<template>
    <div class="landing-page">
      <header>
        <nav>
          <router-link to='/auth'>Log in</router-link>
          <router-link to='/register'>Sign up</router-link>
        </nav>
      </header>
      <main>
        <section class="hero">
          <h1>OpenTask</h1>
          <p>Gérez vos tâches avec efficacité</p>
          <button class="action"><router-link to='/register' class="subsc">Inscrivez-vous maintenant</router-link></button>
        </section>
        <section class="features">
          <h2>Caractéristiques</h2>
          <ul>
            <li>
              <i class="fas fa-check"></i>
              Créez des tâches personnalisées
            </li>
            <li>
              <i class="fas fa-clock"></i>
              Définissez des deadlines précises
            </li>
            <li>
              <i class="fas fa-list"></i>
              Organisez vos étapes de déroulement
            </li>
            <li>
              <i class="fas fa-users"></i>
              Idéal pour les professionnels et les entreprises
            </li>
          </ul>
        </section>
        <section class="benefits">
          <h2>Avantages</h2>
          <ul>
            <li>
              <i class="fas fa-rocket"></i>
              Augmentez votre productivité
            </li>
            <li>
              <i class="fas fa-cog"></i>
              Simplifiez votre gestion de tâches
            </li>
            <li>
              <i class="fas fa-chart-line"></i>
              Suivez vos progrès en temps réel
            </li>
          </ul>
        </section>
        <section class="call-to-action">
          <h2>Rejoignez la communauté OpenTask</h2>
          <button><router-link to='/register'>Inscrivez-vous maintenant</router-link></button>
        </section>
      </main>
    </div>
  </template>

  <style scoped>
    .landing-page {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        padding: 20px;
    }

    header {
        background-color: #333;
        color: #fff;
        padding: 10px;
        text-align: center;
    }

    header nav {
        display: flex;
        justify-content: space-between;
    }

    .hero {
        background-image: linear-gradient(to bottom, #004581, #042e52);
        color: #fff;
        padding: 50px;
        text-align: center;
        }

    .hero h1 {
        font-size: 36px;
        }
        .action{
          height:50px;
          border: 3px solid #eee;
          background: transparent;
          transition: all .3s ease;
          &:hover{
            background-color: #eee;
            color:#555;
          }
        }
        .action .subsc{
          text-decoration: none;
          color: #eee;
          &:hover{
            color: #555;
          }
        }
    .features {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        }

    .features li {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

    .features i {
        margin-right: 10px;
        }

    .benefits {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        }

    .benefits li {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

    .benefits i {
        margin-right: 10px;
        }

    .call-to-action {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
        }

    .call-to-action button {
        background-color: #555;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        }

    .call-to-action button:hover {
        background-color: #666;
    }
    /* Styles responsives */

@media screen and (max-width: 1024px) {
  .landing-page {
    padding: 15px;
  }
  header {
    padding: 5px;
  }
  .hero {
    padding: 30px;
  }
  .hero h1 {
    font-size: 28px;
  }
  .features {
    flex-direction: column;
  }
  .features li {
    margin: 5px;
    padding: 5px;
  }
  .benefits {
    flex-direction: column;
  }
  .benefits li {
    margin: 5px;
    padding: 5px;
  }
}

@media screen and (max-width: 768px) {
  .landing-page {
    padding: 10px;
  }
  header {
    padding: 3px;
  }
  .hero {
    padding: 20px;
  }
  .hero h1 {
    font-size: 22px;
  }
  .features li {
    margin: 3px;
    padding: 3px;
  }
  .benefits li {
    margin: 3px;
    padding: 3px;
  }
  .call-to-action {
    padding: 15px;
  }
  .call-to-action button {
    padding: 5px 10px;
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .landing-page {
    padding: 5px;
  }
  header {
    padding: 2px;
  }
  .hero {
    padding: 15px;
  }
  .hero h1 {
    font-size: 18px;
  }
  .features li {
    margin: 2px;
    padding: 2px;
  }
  .benefits li {
    margin: 2px;
    padding: 2px;
  }
  .call-to-action {
    padding: 10px;
  }
  .call-to-action button {
    padding: 3px 5px;
    font-size: 12px;
  }
}

@media screen and (max-width: 360px) {
  .landing-page {
    padding: 0;
  }
  header {
    padding: 1px;
  }
  .hero {
    padding: 10px;
  }
  .hero h1 {
    font-size: 16px;
  }
  .features li {
    margin: 1px;
    padding: 1px;
  }
  .benefits li {
    margin: 1px;
    padding: 1px;
  }
  .call-to-action {
    padding: 5px;
  }
  .call-to-action button {
    padding: 2px 3px;
    font-size: 10px;
  }
}

@media screen and (max-width: 280px) {
  .landing-page {
    padding: 0;
  }
  header {
    padding: 0;
  }
  .hero {
    padding: 5px;
  }
  .hero h1 {
    font-size: 14px;
  }
  .features li {
    margin: 0;
    padding: 0;
  }
  .benefits li {
    margin: 0;
    padding: 0;
  }
  .call-to-action {
    padding: 0;
  }
  .call-to-action button {
    padding: 1px 2px;
    font-size: 9px;
  }
}
</style>
