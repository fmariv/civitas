<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-material-ui@4.0.0/bare.min.css" />
    
    <!-- Material Icons and fonts -->
    <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Button, { Label, Icon } from '@smui/button';
    import { cityNameStore } from '../stores';
    import 'maplibre-gl/dist/maplibre-gl.css';

    let cityName;

    function subscribeCityName() {
        cityNameStore.subscribe(value => {
            cityName = value
        })
    }

    function openMyWebPage() {
        window.open('http://www.franmartin.es/')
    }

    function toggleSidebar() {
        var elem = document.getElementById('left');
        var classes = elem.className.split(' ');
        var collapsed = classes.indexOf('collapsed') !== -1;
        
        var padding = {};
        
        if (collapsed) {
            // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
            classes.splice(classes.indexOf('collapsed'), 1);
            
            padding['left'] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
        } else {
            padding['left'] = 0;
            // Add the 'collapsed' class to the class list of the element
            classes.push('collapsed');
        }
        
        // Update the class list on the element
        elem.className = classes.join(' ');
    }

    onMount(async() => {
        toggleSidebar();
        subscribeCityName();
    });

  </script>
  
    <div id="left" class="sidebar flex-center left collapsed">
        <div class="sidebar-content rounded-rect flex-center">
            <img class="img-sidebar" src="civitas.png" alt="Civitas" />
            <Button id="fly-button" touch variant="raised">
                <Label>Give me a city!</Label>
            </Button>
            <p class="city-name" in:fade>
                {#key cityName}
                    {#if cityName}
                        { cityName }
                    {/if}
                {/key}
            </p>
            <!-- Make as typography -->
            <div class="made-by-fm">
                <Button on:click={openMyWebPage}>
                    <Label>Made with <Icon class="material-icons">favorite</Icon>by Fran Martín</Label>
                </Button>
            </div>
            <div class="sidebar-toggle rounded-rect left" on:click={toggleSidebar}>
                &rarr;
            </div>
        </div>
    </div>

  <style>
        /* Theme colors. */
        :root {
            --mdc-theme-primary: #3e4fc0;
        }

        .rounded-rect {
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 50px -25px black;
        }
        
        .flex-center {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .flex-center.left {
            left: 0px;
        }

        .sidebar-content {
            position: absolute;
            width: 95%;
            height: 95%;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 32px;
            color: gray;
        }
        
        .sidebar-toggle {
            position: absolute;
            width: 1.3em;
            height: 1.3em;
            overflow: visible;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .sidebar-toggle.left {
            right: -1.5em;
        }
        
        .sidebar-toggle:hover {
            color: #0aa1cf;
            cursor: pointer;
        }
        
        .sidebar {
            transition: transform 1s;
            z-index: 1;
            width: 325px;
            height: 75%;
            top: 12.5%;
        }

        .img-sidebar {
            padding-bottom: 30%;
            width: 85%;
            height: 22%;
        }

        .made-by-fm {
            padding-top: 30%;
            bottom: 0;
        }

        .city-name {
            color: #ed892f;
            font-size: 70%;
            justify-content: center;
        }
        
        /*
        The sidebar styling has them "expanded" by default, we use CSS transforms to push them offscreen
        The toggleSidebar() function removes this class from the element in order to expand it.
        */
        .left.collapsed {
            transform: translateX(-320px);
        }
  </style>
  