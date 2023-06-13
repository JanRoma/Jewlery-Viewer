<script lang="ts">
  import { onMount } from "svelte";

  const navs = [
    {
      title: "Viewer",
      href: "#",
    },
    {
      title: "Picking",
      href: "#",
    },
    {
      title: "Scene",
      href: "#",
    },
    {
      title: "Anti-aliasing",
      href: "#",
    },
    {
      title: "Post processing",
      href: "#",
    },
    {
      title: "Export",
      href: "#",
    },
    {
      title: "Animations",
      href: "#",
    },
    {
      title: "Modifiers",
      href: "#",
    },
    {
      title: "Configurators",
      href: "#",
    },
    {
      title: "Plugins",
      href: "#",
    },
    {
      title: "Extras",
      href: "#",
    },
  ];

  let currentTheme = "";

  onMount(() => {
    const userPrefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const hasUserSetDarkModeManually =
      document.documentElement.dataset.theme == "dark";

    if (!hasUserSetDarkModeManually) {
      setTheme(userPrefersDarkMode ? "dark" : "light");
    }
  });

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.cookie = `siteTheme=${theme};max-age=31536000;path="#"`;
    currentTheme = theme;
  };
</script>

<nav>
  <div class="container">
    <ul>
      {#each navs as { title, href }}
        <li>
          <a
            {href}
            {title}>{title}</a
          >
        </li>
      {/each}
      <li class="relative">
        {#if currentTheme == "light"}
          <a class="moon" href={"#"} on:click={() => setTheme("dark")}>
          </a>
        {:else}
          <a class="sun" href={"#"} on:click={() => setTheme("light")}>
          </a>
        {/if}
      </li>
    </ul>
  </div>
</nav>

<style>
  nav {
    padding: 0.5em;
    background-color: #343a40;
    color: white;
    position: absolute;
    top: 50px;
    margin: auto;
  }

  .container {
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    margin: 0;
    margin-left: auto;
    list-style: none;
    font-size: 1em;
  }
  li {
    margin-right: 20px;
  }
  h1 {
    margin: 0;
    font-size: 1.3em;
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: #aaa;
  }
  .logo {
    color: white;
  }
  .active {
    color: white;
  }
</style>