<script>
	import CarouselRow from "./Carrousel.svelte";
</script>

<div class="relative space-y-6">
	<div class="h-16 w-full bg-[rgb(0,0,145)]"></div>
	<CarouselRow row="row1" reverse={true} />
	<CarouselRow row="row2" />
	<div class="flew-row mt-24 flex h-100 w-full justify-between overflow-hidden px-64">
		<div class="aspect-square p-12">
			<img
				src="/static/img/logos/LOGO FFD-V1-1.png"
				class="h-full w-full rounded-full object-contain shadow-[0_10px_30px_-5px_rgba(30,58,138,0.6)]"
				alt="logoffd"
			/>
		</div>
		<div class="aspect-square p-12">
			<img
				src="/static/img/logos/logo_fantdarts.jpg"
				class="h-full w-full rounded-full object-contain p-4 shadow-[0_10px_30px_-5px_rgba(30,58,138,0.6)]"
				alt="logoffd"
			/>
		</div>
	</div>
</div>
