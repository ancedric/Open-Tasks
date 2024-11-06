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
          <button><router-link to='/register'>Inscrivez-vous maintenant</router-link></button>
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
        background-image: linear-gradient(to bottom, #333, #555);
        color: #fff;
        padding: 50px;
        text-align: center;
        }

    .hero h1 {
        font-size: 36px;
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
  </style>