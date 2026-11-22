<script lang="ts">

    const hc_flag_white = "https://snowglobe.hackclub.com/imgs/hc-flag.png"

    let email = $state('')
    import SGlogo from "../images/SGlogo.webp"
    import globe_v1 from "../images/globe_v1.webp"

    

</script>

<main class="relative">
    <!-- Nav Bar-->
    <nav class="fixed z-30 bg-linear-to-l from-red-500/70 to-red-700/70 flex flex-row justify-between items-center h-[6vh] w-full ">
        <!-- hackclub white flag banner thingy-->
        <a href="https://hackclub.com/" class="ml-[2vw]">
            <img src={hc_flag_white} alt="Hack Club "/>
        </a>

        <!-- Nav Bar "lniks" -->
        <div class="w-full h-full flex flex-row justify-end items-center text-white text-[3.5vh] font-serif font-light gap-[2vw] mr-[2vw]">
            <h3> HOME </h3>
            <h3> ABOUT </h3>
            <h3> FAQ </h3>
            <a href="/auth/login" class="hover:underline"> LOGIN→ </a>
        </div>
    </nav>

    <div class="relative h-screen w-full"> 
    <!-- Main part of the hero content-->
    <section class="relative h-[95vh] w-full flex flex-col z-50 ">
        <!-- First top height of the hero-->
        <div class=" relative w-full h-[85vh] flex flex-row ">
            <div class="w-full mt-auto flex flex-col items-end ">
                <img src={SGlogo} alt="snowglove logo" class="w-[80%]"/>
            </div>

            <div class="w-full h-full flex flex-col justify-end ml-[5vw]"> 
                <h2 class="text-blue-900 font-serif text-[3vh] w-[90%]">
                    Every single Hackclub Staff at snowglobe is FROZON,
                     now you must redo snowglobe by completing mini games to raise 
                     the heat to save Hack Club!
                </h2>
                <h3 class= "mt-[2vh] text-blue-600 font-serif text-[2.25vh] w-[80%] mb-[1vh]">
                    For hackclubers - At your mamas house - Until my hosting credits run out
                </h3>
            </div>
        </div>

        <!-- Bottom part of the hero-->
        <div class="h-[20vh] w-[50%] mx-auto flex flex-row items-center justify-center gap-[1.5vw] ">
            <input bind:value={email} placeholder="you@hackclub.com" class=" text-[3vh] px-3 py-2 h-[5vh] w-[70%] bg-linear-to-t from-yellow-100 to bg-white outline-4 outline-gray-400" >
            <a href="/auth/login" class="h-[5vh] w-[5vw] p-2 text-red-900 text-[2.75vh] font-serif outline-4 outline-red-800 bg-linear-to-b from-red-600/70 to bg-yellow-50 flex flex-col justify-center items-center hover:scale-105 transition-all duration-200 ease-out">
                go!
            </a>
        </div>

    </section>
    <!-- Back ground Snowglobe-->
    
    </div>
<div class=" absolute top-0 right-0 z-0 h-screen w-full ">
        <img src={globe_v1} alt="snowglobe globe" class=" ml-auto w-[80%] h-full opacity-75"/>
    </div>
    <!-- Back ground blue color-->
    <div class=" fixed z-0 h-full w-full bg-sky-50/50 "></div>

</main>