<script lang="ts">
	import type { PageProps } from './$types';

	// images
	import SGlogo from '../../images/SGlogo.webp'
	import julie from '../../images/julie.jpg'
	const slack_lgo = "https://imgs.search.brave.com/XJGUyoT8SjItGqvXTTBMkLGyrvuYFQBV3p716kLRg1w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZEpfSGh0RzBa/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc0NTM4MTI4MjU2/NA"
	let { data }: PageProps = $props();

</script>

<main class="relative h-screen w-full over!flow-hidden bg-sky-50/20">
	<!--Story progress bar-->
	<div class="bg-blue-900 flex flex-row items-center justify-baseline w-screen h-[4vh]">
		<div class=" font-serif ml-[1.5vw] text-[1.75vh] text-white"> Story Progress Bar </div>
		<div class="bg-sky-500 w-[70%] mx-[2vh] h-[35%]"></div>
	</div>

	<!-- Main area-->
	 <div class=" h-[96vh] flex flex-row">
		<!-- Side Nav -->
		<nav class="flex flex-col w-[17.5vw] bg-white outline-2 outline-gray-400 items-center">
			<div class="w-full h-full flex flex-col items-center">
				<!-- SG logo-->
				<img src={SGlogo} alt="snowglobe logo" class="min-w-[15vw] max-h-[20vh] "/>

				<!---Links in the nav bar-->
				<div class=" mt-[5vh] font-serif text-[5vh] text-blue-500 flex flex-col gap-[2vh]">
					<h3>Projects</h3>
					<h3>Explore</h3>
					<h3>Shop</h3>
					<h3>FAQ</h3>
				</div>
			</div>

			<!-- Profile stuff -->
			 <div class="mb-5vh  w-full h-[15vh] flex flex-row items-center justify-center">
				
				<!-- Settings -->
				 <div class="relative size-[7.5vh] bg-white outline-3 outline-gray-400 flex items-center justify-center text-[4vh] overflow-hidden">
					<img src={julie} alt="julia mogging" class="size-[15vh] absolute top-[0.05vh]"/>
				 </div>
				 <div class="w-[10vw] flex flex-col items-center">
						<h5 class=" text-[2vh] ml-[1vw] text-blue-800 max-w-[80%]"> Welcome @{data.user.slackId}</h5>
						<div class="flex flex-row items-center justify-between gap-[1vw]"> 
							<img src={slack_lgo} alt="slacklgoo" class=" outline-2 outline-gray-300 size-[2vw]"/>
							<div class=" outline-2 outline-gray-300 size-[2vw] text-[1.5vw]">⚙ </div>
							<div class=" outline-2 outline-gray-300 size-[2vw] text-[1.5vw] flex justify-center items-center">→ </div>
						</div>
				</div>
			 </div>
			
			
		</nav>

	 </div>





	<h1 class="text-3xl">hi {data.user.name} 👋</h1>
	<p class="mt-2">points: {data.user.points}</p>

	<form method="POST" action="/auth/logout" class="mt-6">
		<button class="cursor-pointer underline">log out</button>
	</form>
</main>
