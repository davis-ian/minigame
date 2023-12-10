<script setup>
import { RouterLink } from 'vue-router'

import { ref } from 'vue'

const items = ref([
	{
		label: 'Home',
		icon: 'fa-solid fa-home',
		route: '/'
	},
	{
		label: 'About',
		icon: 'fa-solid fa-home',
		route: '/about'
	}
])
</script>

<template>
	<!-- <header>
    

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>

</header> -->
	<Menubar :model="items">
		<template #item="{ item, props, hasSubmenu, root }">
			<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
				<a :href="href" v-bind="props.action" @click="navigate">
					<font-awesome-icon :icon="item.icon"></font-awesome-icon>
					<span class="ml-2">{{ item.label }}</span>
				</a>
			</router-link>
			<a v-else class="flex align-items-center" v-bind="props.action">
				<font-awesome-icon :icon="item.icon"></font-awesome-icon>
				<span class="ml-2">{{ item.label }}</span>

				<span
					v-if="item.shortcut"
					class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
					>{{ item.shortcut }}</span
				>
				<i
					v-if="hasSubmenu"
					:class="[
						'pi pi-angle-down text-primary',
						{ 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
					]"
				></i>
			</a>
		</template>
	</Menubar>
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
  border: 2px solid red;
  
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
