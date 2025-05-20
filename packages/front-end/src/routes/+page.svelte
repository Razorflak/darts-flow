<script>
	import {
		Button,
		Alert,
		Card,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Toast
	} from "flowbite-svelte";
	import { FireOutline } from "flowbite-svelte-icons";
</script>

<Button color="primary">Primary</Button>
<Alert color="secondary">Secondary</Alert>
<Card href="/cards" color="cyan" class="p-4 sm:p-6">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-red-800">
		Noteworthy technology acquisitions 2021
	</h5>
	<p class="leading-tight font-normal text-gray-700 dark:text-gray-700">
		Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
		order.
	</p>
</Card>
<Navbar color="amber">
	<NavBrand href="/">
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-red-800"
			>Flowbite</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/services">Services</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>
<Toast color="rose">
	{#snippet icon()}
		<FireOutline class="h-6 w-6" />
	{/snippet}
	Dismissable user notification.
</Toast>

<div class="bg-mint-500">toto</div>
