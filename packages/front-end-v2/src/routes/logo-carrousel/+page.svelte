<script>
	import CarouselRow from "./Carrousel.svelte";
</script>

<div class="relative space-y-6">
	<div class="h-16 w-full bg-[rgb(0,0,145)]"></div>
	<div style="box-shadow: 0 6px 24px -1px rgba(0,0,0,1);" class="py-12">
		<CarouselRow row="row1" reverse={true} />
		<CarouselRow row="row2" />
	</div>
	<div class="flew-row mt-6 flex h-100 w-full justify-between overflow-hidden px-64">
		<div class="aspect-square p-12">
			<img
				src="/img/logos/LOGO FFD-V1-1.png"
				class="h-full w-full rounded-full object-contain shadow-[0_20px_30px_-1px_rgba(0,0,145,0.6)]"
				alt="logoffd"
			/>
		</div>
		<div class="aspect-square p-12">
			<img
				src="/img/logos/logo_fantdarts.jpg"
				class="h-full w-full rounded-full object-contain p-4 shadow-[0_20px_30px_-1px_rgba(0,0,145,0.6)]"
				alt="logoffd"
			/>
		</div>
	</div>
</div>
