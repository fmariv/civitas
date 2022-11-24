<svelte:head>
    <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/svelte-material-ui@4.0.0/bare.min.css"
    />

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
    import Dialog, { Content, Actions } from '@smui/dialog';
    import { RingLoader } from 'svelte-loading-spinners';
    import { cityNameStore } from '../stores';
    import 'maplibre-gl/dist/maplibre-gl.css';

    let cityName;
    let open = false;

    /**
     * Subscribe the city name to the city name store
     */
    function subscribeCityName() {
      cityNameStore.subscribe((value) => {
        cityName = value;
      });
    }

    /**
     * Open my personal webpage
     */
    function openMyWebPage() {
      window.open('http://www.franmartin.es/');
    }

    /**
     * Open the GitHub repository of Civitas
     */
    function openMyGitHub() {
      window.open('https://github.com/fmariv/civitas');
    }

    /**
     * Open the help dialog
     */
    function openDialog() {
      open = true;
    }

    /**
     * Show or hide the content sidebar
     */
    function toggleSidebar() {
      const elem = document.getElementById('left');
      const classes = elem.className.split(' ');
      const collapsed = classes.indexOf('collapsed') !== -1;

      const padding = {};

      if (collapsed) {
        // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
        classes.splice(classes.indexOf('collapsed'), 1);

        padding.left = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
      } else {
        padding.left = 0;
        // Add the 'collapsed' class to the class list of the element
        classes.push('collapsed');
      }

      // Update the class list on the element
      elem.className = classes.join(' ');
    }

    onMount(async () => {
      toggleSidebar();
      subscribeCityName();
    });

  </script>

    <div id="left" class="sidebar flex-center left collapsed">
        <div class="sidebar-content rounded-rect flex-center">
            <Button on:click={openMyGitHub}>
                <Label style="font-size: 200%; font-weight: bold">
                    Civitas <Icon class="material-icons">logo_dev</Icon>
                </Label>
            </Button>
            <Button on:click={openDialog}>
                <Label>What can I do <Icon class="material-icons">help</Icon></Label>
            </Button>
            <Button style="margin-top: 7%" id="fly-button" touch variant="raised">
                <Label>Give me a city!</Label>
            </Button>
            {#key cityName}
                {#if cityName}
                <p class="city-name" in:fade>{ cityName }</p>
                {:else}
                <p class="city-name" in:fade>Waiting for a new place...</p>
                {/if}
            {/key}
            <div id="loader">
                <RingLoader size="40" color="#ed892f" unit="px" duration="1.5s" />
            </div>
            <div class="footer">
                <Button on:click={openMyWebPage}>
                    <Label style="font-size: 85%">
                        Made with <Icon class="material-icons">favorite</Icon>by Fran Martín
                    </Label>
                </Button>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="sidebar-toggle rounded-rect left" on:click={toggleSidebar}>
                &rarr;
            </div>
        </div>
    </div>

    <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
    >
    <Content id="simple-content">
        <Icon class="material-icons">info</Icon>
        Civitas allows you to visit new cities and places by flying
        randomly all around the globe.
        <br><br>
        <Icon class="material-icons">lightbulb</Icon>
        Tip: the more you fly, the smoother the experience will be,
        as the vector tiles from the basemap will store in cache.
    </Content>
    <Actions>
        <Button>
            <Label>Got it!</Label>
        </Button>
    </Actions>
    </Dialog>

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
            height: 55%;
            top: 22.5%;
        }

        #loader {
            visibility: hidden;
        }

        .footer {
            padding-top: 20%;
        }

        .city-name {
            color: #ed892f;
            font-size: 60%;
            text-align: center;
            text-overflow: ellipsis;
            max-width: 75%;
        }

        /*
        The sidebar styling has them "expanded" by default,
        we use CSS transforms to push them offscreen.
        The toggleSidebar() function removes this class
        from the element in order to expand it.
        */
        .left.collapsed {
            transform: translateX(-320px);
        }
  </style>
